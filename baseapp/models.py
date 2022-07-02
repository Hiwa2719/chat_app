from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Message(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username


class Person(User):
    contacts = models.ManyToManyField('self')


class Group(models.Model):
    name = models.CharField(max_length=256)
    members = models.ManyToManyField(User)

    def __str__(self):
        return self.name
