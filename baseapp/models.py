from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Message(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username


class Person(User):
    contacts = models.ManyToManyField('self')

    class Meta(User.Meta):
        verbose_name = _("person")
        verbose_name_plural = _("persons")


class Chat(models.Model):
    name = models.CharField(max_length=256)
    members = models.ManyToManyField(User)

    def __str__(self):
        return self.name
