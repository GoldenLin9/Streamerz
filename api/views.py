from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ChannelSerializer, AccountSerializer
from .models import Channel

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from django.contrib.auth.forms import UserCreationForm
from django.template.loader import render_to_string
from django.forms.models import model_to_dict

from django.http import HttpResponse, HttpResponseNotFound

from django.views.decorators.csrf import csrf_exempt


# def register(request):
#     form = UserCreationForm()
#     print("HIHI")

#     if request.method == "POST":
#         form = UserCreationForm(request.POST)

#         if form.is_valid():
#             form.save()
#     print(form)

#     serialized = UserCreationFormSerializer(form)

#     response_data = {"message": serialized}
#     return JsonResponse(model_to_dict(form, safe = False))

@csrf_exempt
@api_view(["PUT", "GET", "POST"])
def register(request):
    print("ENTER THE DUNGEON")
    print(request.method)
    
    serializer = AccountSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    # print(serializer)
    # print(serializer.data)
    # print(serializer.data.uid)

    return HttpResponse(status = 201)
    



class ChannelList(APIView):

    def get(self, request):
        channels = Channel.objects.all()
        serializer = ChannelSerializer(channels, many = True)
        print(serializer)
        return Response(serializer.data)
    
    # fix me later
    def post(self, request):
        # data = request.data

        # print(data["url"], data["name"], data["platform"])
        # channel = Channel.objects.create(
        #     User = User.objects.get(pk = 1),
        #     url = data["url"],
        #     name = data["name"],
        #     platform = data["platform"],
        # )

        # serializer = ChannelSerializer(data = channel)
        
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status = status.HTTP_201_CREATED)
        # return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        return HttpResponse(status = 201)
        


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
        channel = self.get_object(pk)
        channel.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)