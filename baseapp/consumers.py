import json
from datetime import datetime

import pytz
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model

from .models import Message, Chat
from .serializers import MessageSerializer
from .utils import get_chats, redis_client

User = get_user_model()


class ChatConsumer(JsonWebsocketConsumer):

    def get_messages(self, content, chat):

        messages = chat.message_set.all().order_by('-timestamp')[:10]
        content = {
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def messages_to_json(self, messages):
        return [self.message_to_json(msg) for msg in messages]

    def message_to_json(self, message):
        return MessageSerializer(message).data

    def new_message(self, content, chat):
        message = Message.objects.create(
            author=self.user,
            content=content['message'],
            chat=chat
        )

        serialized_message = self.message_to_json(message)
        redis_client.hset(f'{chat.name}_messages', message.id, json.dumps(serialized_message))
        chat_string = redis_client.hget(f'{self.user}_chats', chat.id)
        chat_dict = json.loads(chat_string)
        chat_dict['update'] = str(datetime.now(tz=pytz.UTC))
        redis_client.hset(f'{self.user}_chats', chat.id, json.dumps(chat_dict))

        #  send message to group
        async_to_sync(self.channel_layer.group_send)(
            chat.name,
            {
                'type': 'send.message',
                'message': {
                    'command': 'new_message',
                    'chat': chat.id,
                    'message': serialized_message,
                }
            }
        )

    COMMANDS = {
        'get_messages': get_messages,
        'new_message': new_message
    }

    def connect(self):
        # Join room group
        self.user = self.scope['user']
        chats = get_chats(self.user)

        for chat in chats:
            async_to_sync(self.channel_layer.group_add)(
                chat['name'],
                self.channel_name
            )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        if hasattr(self, 'user'):
            for chat in get_chats(self.user):
                async_to_sync(self.channel_layer.group_discard)(
                    chat['name'],
                    self.channel_name
                )

    # Receive message from WebSocket
    def receive_json(self, content, **kwargs):
        chat = Chat.objects.get(id=content['chat'])
        chat_name_list = [chat['name'] for chat in get_chats(self.user)]

        if chat.name in chat_name_list:
            self.COMMANDS[content['command']](self, content, chat)

    def send_message(self, event):
        message = event['message']
        self.send_json(message)
