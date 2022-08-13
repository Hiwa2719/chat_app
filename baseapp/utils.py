import json

import redis
from django.conf import settings
from .serializers import ChatSerializer

redis_client = redis.Redis(settings.REDIS_ENDPOINT, settings.REDIS_PORT)


def get_chats(user):
    key = f'{user.username}_chats'
    if redis_client.exists(key):
        redis_dict = redis_client.hgetall(key)
        chats = list()
        for chat in redis_dict.values():
            chat = json.loads(chat)
            messages = redis_client.hgetall(f'{chat["name"]}_messages')
            msg = list()
            for key, value in messages.items():
                msg.append(
                    json.loads(value)
                )
            # msg = sorted(msg, key=lambda x: x['id'])
            chat['messages'] = msg
            chats.append(
                chat
            )
        # chats = sorted(chats, key=lambda x: x['update'], reverse=True)
    else:
        chats_queryset = user.chat_set.all()
        chats = ChatSerializer(chats_queryset, many=True).data
        for chat in chats:
            messages = chat['messages']
            messages_key = f'{chat["name"]}_messages'
            for message in messages:
                redis_client.hset(messages_key, message['id'], json.dumps(message))
            modified_chat = dict(chat)
            del modified_chat['messages']
            redis_client.hset(key, chat['id'], json.dumps(modified_chat))
    return chats