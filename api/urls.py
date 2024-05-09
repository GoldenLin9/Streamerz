from django.urls import path
from . import views


urlpatterns = [
    path("channel-list", views.ChannelList.as_view(), name = "channel-list"),
    path("channel/<int:pk>", views.ChannelDetail.as_view(), name = "channel-detail"),
]