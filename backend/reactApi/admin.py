from django.contrib import admin
from .models import ReactRequest

class ReactRequestAdmin(admin.ModelAdmin):
    list_display = ('modelsNLP','methods','textThema')

# Register your models here.

admin.site.register(ReactRequest, ReactRequestAdmin)
