from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model

from .models import Message, Chat
from .serializers import MessageSerializer

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
        #  send message to group
        async_to_sync(self.channel_layer.group_send)(
            chat.name,
            {
                'type': 'chat.message',
                'message': {
                    'command': 'new_message',
                    'message': self.message_to_json(message)
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
        self.chats = self.user.chat_set.all()

        for chat in self.chats:
            async_to_sync(self.channel_layer.group_add)(
                chat.name,
                self.channel_name
            )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        if hasattr(self, 'user'):
            for chat in self.chats:
                async_to_sync(self.channel_layer.group_discard)(
                    chat.name,
                    self.channel_name
                )

    # Receive message from WebSocket
    def receive_json(self, content, **kwargs):
        chat = Chat.objects.get(id=content['chat'])
        # todo update self.chats command
        if chat in self.chats:
            self.COMMANDS[content['command']](self, content, chat)

    def send_message(self, message):
        self.send_json(message)
