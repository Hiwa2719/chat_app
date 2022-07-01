from django.urls import path
from . import views


app_name = 'baseapp'


urlpatterns = [
    path('', views.index_view, name='index'),
    path('<str:room_name>/', views.room, name='room'),
    path('check-username/<str:username>/', views.check_username, name='check-username'),
]
