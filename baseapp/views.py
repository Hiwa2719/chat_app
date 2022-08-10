import json

import redis
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect, reverse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Chat
from .serializers import MyTokenObtainPairSerializer, UserCreationSerializer, UserSerializer, ChatSerializer, \
    UserSerializerWithoutToken
from .utils import get_chats

User = get_user_model()
redis_client = redis.Redis(host='localhost', port=6379, db=0)


def index_view(request):
    return render(request, 'baseapp/index.html')


def room(request, room_name):
    return render(request, 'baseapp/room.html', {
        'room_name': room_name
    })


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def signup(request):
    serializer = UserCreationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token_serializer = UserSerializer(user)
        return Response(token_serializer.data)
    return Response({
        'errors': serializer.errors.values()
    },
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        user.refresh_from_db()
        serializer_with_token = UserSerializer(user)
        return Response(serializer_with_token.data)
    errors = {'errors': serializer.errors.values()}
    return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
@permission_classes([IsAuthenticated])
def user_chats(request):
    user = request.user
    chats = get_chats(user)
    return Response(chats)


@api_view()
@permission_classes([IsAuthenticated])
def get_contacts(request):
    key = f'{request.user.username}_contacts'

    if redis_client.exists(key):
        string_contacts = redis_client.get(key)
        contacts = json.loads(string_contacts)
    else:
        person = request.user.person
        contacts_queryset = person.contacts.all()
        serializer = UserSerializerWithoutToken(contacts_queryset, many=True)
        contacts = serializer.data
        redis_client.set(key, json.dumps(contacts))
    return Response(contacts)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_contact(request):
    try:
        contact_id = request.data.get('id')
        contact = User.objects.get(id=contact_id)
    except User.DoesNotExist:
        return Response('this contact does not exists', status=status.HTTP_400_BAD_REQUEST)
    person = request.user.person
    person.contacts.remove(contact)
    key = f'{request.user.username}_contacts'

    if redis_client.exists(key):
        string_contacts = redis_client.get(key)
        contacts = json.loads(string_contacts)
        new_contacts = [contact for contact in contacts if contact['id'] != contact_id]
        redis_client.set(key, json.dumps(new_contacts))
        return Response(new_contacts)
    return redirect(reverse('baseapp:get-contacts'))


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_chat(request):
    user = request.user
    chat, created = Chat.objects.get_chat(request)
    serializer = ChatSerializer(chat)
    if created:
        redis_client.delete(f'{user.username}_chats')
    return Response({**serializer.data, 'created': created})


@api_view()
@permission_classes([IsAuthenticated])
def search_users(request, query):
    users = User.objects.filter(username__icontains=query).exclude(username=request.user.username)
    serializer = UserSerializerWithoutToken(users, many=True)
    return Response(serializer.data)
