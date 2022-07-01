from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, UserCreationSerializer

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
        token_serializer = MyTokenObtainPairSerializer(user)
        return Response(token_serializer.data)
    return Response({
        'errors': serializer.errors.values()
    },
        status=status.HTTP_400_BAD_REQUEST
    )
