from django.urls import path
from . import views


urlpatterns = [
    path("", views.getRoutes, name = "routes"),
    path("channel-list/", views.channelList, name = "channel-list"),
    path("channel-detail/<int:pk>/", views.channelDetail, name = "channel-detail"),
    path("channel-create/", views.channelCreate, name = "channel-create"),
    path("channel-update/<int:pk>/", views.channelUpdate, name = "channel-update"),
    path("channel-delete/<int:pk>/", views.channelDelete, name = "channel-delete"),
] 