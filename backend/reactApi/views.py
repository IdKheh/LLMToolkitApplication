from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReactRequestSerializer
from .models import ReactRequest

# Create your views here.

class ReactRequestView(viewsets.ModelViewSet):
    serializer_class = ReactRequestSerializer
    queryset = ReactRequest.objects.all()

