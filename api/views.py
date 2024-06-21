from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ChannelSerializer
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

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['uid'] = user.uid
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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
    print(request.data)
    
    serializer = AccountSerializer(data = request.data)
    if serializer.is_valid():
        print(serializer)
        serializer.save()
    # print(serializer)
    # print(serializer.data)
    # print(serializer.data.uid)

    return HttpResponse(status = 201)
    

@csrf_exempt
@api_view(["POST"])
def channel_list(request):
    print(request.data)

    uid = request.data["uid"]

    channels = Channel.objects.filter(Account__uid=uid)
    channels_data = [model_to_dict(channel) for channel in channels]
    
    print("returning ", channels_data)
    return Response({"channels": channels_data}, status = 200)


@csrf_exempt
@api_view(["POST"])
def channel_create(request):
    data = request.data
    print(data["uid"])
    print(data["new_channel"])
    print(data["new_channel"]["name"])

    account = get_object_or_404(Account, uid = data["uid"])

    channel = Channel.objects.create(
        Account = account,
        url = data["new_channel"]["url"],
        name = data["new_channel"]["name"],
        platform = data["new_channel"]["platform"]
    )



    return Response(model_to_dict(channel), status = 200)


class ChannelList(APIView):

    def get(self, request):
        print(request.data)

        uid = request.data["uid"]

        channels = Channel.objects.filter(Account__uid=uid)
        channels_data = [model_to_dict(channel) for channel in channels]
        
        
        return JsonResponse({"channels": channels_data}, status = 200)
    
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