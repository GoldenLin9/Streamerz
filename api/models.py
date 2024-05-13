from django.db import models

# Create your models here.
class Account(models.Model):
    uid = models.UUIDField()

class Channel(models.Model):
    Account = models.ForeignKey(Account, on_delete = models.CASCADE)
    url = models.URLField()
    name = models.CharField(max_length = 100, blank = True)
    platform = models.CharField(max_length = 100, blank = False)

    def __str__(self):
        return self.name