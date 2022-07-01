from django.urls import path
from . import views


app_name = 'baseapp'


urlpatterns = [
    path('', views.index_view, name='index'),
    path('signup/', views.signup, name='signup'),
    path('<str:room_name>/', views.room, name='room'),
]
