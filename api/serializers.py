from rest_framework import serializers
from .models import Channel
from django.contrib.auth.models import User

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ["id", "User", "url", "name", "platform"]

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username", "password"]
        extra_knwargs = {"password": { "write_only": True}}
    
    def create(self, validated_data):
        
        user = User(
            username = validated_data["username"]
        )

        user.set_password(validated_data["password"])
        user.is_active = True
        user.save()
        
        return user
    