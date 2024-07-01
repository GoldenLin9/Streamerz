from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("channel-list", views.ChannelList.as_view(), name = "channel-list"),
    path("list/channels/", views.channel_list, name = "channel-list"),

    path("channel/<int:pk>", views.ChannelDetail.as_view(), name = "channel-detail"),



    path("register/", views.Register.as_view(), name = "register"),
    path("logout/", views.BlackListToken.as_view(), name = "blacklist"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]