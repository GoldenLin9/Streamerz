from rest_framework import serializers
from .models import Channel
from .models import Account

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ["id", "Account", "url", "name", "platform"]

class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ["uid", "username"]