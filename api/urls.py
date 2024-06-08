from django.urls import path
from . import views


urlpatterns = [
    path("channel-list", views.ChannelList.as_view(), name = "channel-list"),
    path("list/channels/", views.channel_list, name = "channel-list"),

    path("create/channel/", views.channel_create, name = "channel-create"),

    path("channel/<int:pk>", views.ChannelDetail.as_view(), name = "channel-detail"),

    path("register", views.register, name = "register"),
]