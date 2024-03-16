from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Channel(models.Model):
    User = models.ForeignKey(User, on_delete = models.CASCADE)
    url = models.URLField()
    name = models.CharField(max_length = 100, blank = True)
    platform = models.CharField(max_length = 100, blank = False)

    def __str__(self):
        return self.url