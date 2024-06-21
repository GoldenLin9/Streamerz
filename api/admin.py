from django.contrib import admin
from .models import Channel, CustomUser
from django.contrib.auth.admin import UserAdmin

# Register your models here.


admin.site.register(Channel)
admin.site.register(CustomUser)