from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path("channel-list", views.ChannelList.as_view(), name = "channel-list"),
    path("list/channels/", views.channel_list, name = "channel-list"),

    path("create/channel/", views.channel_create, name = "channel-create"),

    path("channel/<int:pk>", views.ChannelDetail.as_view(), name = "channel-detail"),

    path("register", views.register, name = "register"),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]