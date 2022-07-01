from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MyTokenObtainPairSerializer

User = get_user_model()


def index_view(request):
    return render(request, 'baseapp/index.html')


def room(request, room_name):
    return render(request, 'baseapp/room.html', {
        'room_name': room_name
    })


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view()
def check_username(request, username):
    username_exist = User.objects.filter(username=username).exists()
    return Response({
        'usernameExist': username_exist
    })
