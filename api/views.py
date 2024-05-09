from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ChannelSerializer
from .models import Channel
from .models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(["GET"])
def getRoutes(request):

    api_urls = {
        "Create": "/task-create/",
    }
    return Response(api_urls)
    

class ChannelList(APIView):

    def get(self, request):
        channels = Channel.objects.all()
        serializer = ChannelSerializer(channels, many = True)
        print(serializer)
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data

        print(data["url"], data["name"], data["platform"])
        channel = Channel.objects.create(
            User = User.objects.get(pk = 1),
            url = data["url"],
            name = data["name"],
            platform = data["platform"],
        )

        serializer = ChannelSerializer(data = channel)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        


class ChannelDetail(APIView):

    def get_object(self, pk):
        return get_object_or_404(Channel, pk = pk)

    def get(self, request, pk):
        serializer = ChannelSerializer(data = self.get_object(pk))
        return Response(serializer.data)
    
    def put(self, request, pk):
        serializer = ChannelSerializer(self.get_object(pk), data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        print("Heree: ", Channel.objects.all().last().pk)
        channel = self.get_object(pk)
        channel.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)