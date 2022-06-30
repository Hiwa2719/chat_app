from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer


def index_view(request):
    return render(request, 'baseapp/index.html')


def room(request, room_name):
    return render(request, 'baseapp/room.html', {
        'room_name': room_name
    })


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
