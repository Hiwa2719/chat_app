import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

from .models import Message

User = get_user_model()


class ChatConsumer(WebsocketConsumer):

    def get_messages(self, data):
        messages = Message.objects.all()[:10]
        content = {
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def messages_to_json(self, messages):
        return [self.message_to_json(msg) for msg in messages]

    def message_to_json(self, message):
        return {
            'author': message.author.username,
            'content': message.content,
            'timestamp': message.timestamp
        }

    def new_message(self, data):
        username = data.get('username')
        user = User.objects.get(username=username)
        message = Message.objects.create(
            author=user,
            content=data['message']
        )
        return self.send_chat_message(
            {
                'command': 'new_message',
                'message': self.message_to_json(message)
            }
        )

    COMMANDS = {
        'get_messages': get_messages,
        'new_message': new_message
    }

    def connect(self):
        # Join room group
        self.user = self.scope['user']
        for chat in self.user.chat_set.all():
            async_to_sync(self.channel_layer.group_add)(
                chat.name,
                self.channel_name
            )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        if hasattr(self, 'user'):
            for chat in self.user.chat_set.all():
                async_to_sync(self.channel_layer.group_discard)(
                    chat.name,
                    self.channel_name
                )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        print(dir(self.channel_layer))
        print(dir(self.channel_layer.valid_group_name))
        print(self.channel_layer.valid_group_name)
        # self.COMMANDS[data['command']](self, data)

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))

