from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
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
    contacts = models.ManyToManyField(User, related_name='+', blank=True)

    class Meta(User.Meta):
        verbose_name = _("person")
        verbose_name_plural = _("persons")

    def __str__(self):
        return self.username


class ChatManager(models.Manager):
    def get_chat(self, request):
        created = False
        user = request.user
        contact_id = request.data.get('id')
        contact = User.objects.get(id=contact_id)
        chat = self.get_queryset().filter(members=user).filter(members__id=contact_id).first()
        if not chat:
            chat = Chat.objects.create(name=f'{user.username}_{contact.username}_chat')
            chat.members.set([user, contact])
            chat.save()
            created = True
        return chat, created


class Chat(models.Model):
    name = models.CharField(max_length=256)
    members = models.ManyToManyField(User)

    objects = ChatManager()

    def __str__(self):
        return self.name


@receiver(post_save, sender=User)
def person_creation_receiver(sender, instance, created, *args, **kwargs):
    if created:
        person = Person()
        person.user_ptr = instance
        person.save()
