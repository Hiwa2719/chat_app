# Generated by Django 4.0.5 on 2022-08-04 11:45

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('baseapp', '0008_person_contacts'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='update',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 8, 4, 11, 45, 32, 45511, tzinfo=utc)),
            preserve_default=False,
        ),
    ]