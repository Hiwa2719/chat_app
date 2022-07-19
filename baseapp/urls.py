from django.urls import path
from . import views


app_name = 'baseapp'


urlpatterns = [
    path('', views.index_view, name='index'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('update-profile/', views.update_profile, name='update-profile'),
    path('chats/', views.user_chats, name='user-chats'),
    path('get-contacts/', views.get_contacts, name='get-contacts'),
    path('remove-contact/', views.remove_contact, name='remove-contact'),
    path('<str:room_name>/', views.room, name='room'),
]
