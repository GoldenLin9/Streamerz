from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ChannelSerializer
from .models import Channel

# Create your views here.
@api_view(["GET"])
def getRoutes(request):

    api_urls = {
        "Create": "/task-create/",
    }
    return Response(api_urls)


@api_view(["GET"])
def channelList(request):

    channels = Channel.objects.all()
    serializer = ChannelSerializer(channels, many = True)

    return Response(serializer.data)

@api_view(["GET"])
def channelDetail(request, pk):

    channels = Channel.objects.get(pk = pk)
    serializer = ChannelSerializer(channels, many = False)

    return Response(serializer.data)


@api_view(["POST"])
def channelCreate(request):

    serializer = ChannelSerializer(data = request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(["PUT"])
def channelUpdate(request, pk):
    channel = Channel.objects.get(id = pk)
    serializer = ChannelSerializer(instance = channel, data = request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["DELETE"])
def channelDelete(request, pk):
    channel = Channel.objects.get(id = pk)
    channel.delete()

    return Response("Item successfully deleted")
    