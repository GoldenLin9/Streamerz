# Generated by Django 5.0.3 on 2024-03-11 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_channel_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='channel',
            name='platform',
            field=models.CharField(default='Twitch', max_length=100),
            preserve_default=False,
        ),
    ]