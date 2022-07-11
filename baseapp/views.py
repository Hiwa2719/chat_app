from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, UserCreationSerializer, UserSerializer, ChatSerializer

User = get_user_model()


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
    chats = request.user.chat_set.all()
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)
