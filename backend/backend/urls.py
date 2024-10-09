from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from reactApi import views
from . import views as test

router = routers.DefaultRouter()
router.register(r'react', views.ReactRequestView, 'reactApi')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('test/', test.send_some_data),
]
