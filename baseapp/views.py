from django.shortcuts import render


def index_view(request):
    return render(request, 'baseapp/index.html')


def room(request, room_name):
    return render(request, 'baseapp/room.html', {
        'room_name': room_name
    })
