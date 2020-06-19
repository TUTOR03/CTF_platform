from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Task)
admin.site.register(models.Answer)
admin.site.register(models.Results)
admin.site.register(models.File)