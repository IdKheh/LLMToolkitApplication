from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views as test

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('test/', test.send_some_data),
]
