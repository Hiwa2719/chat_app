from django.contrib import admin
from .models import Message, Person, Chat


admin.site.register(Message)
admin.site.register(Person)
admin.site.register(Chat)

