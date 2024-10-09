from rest_framework import serializers
from .models import ReactRequest

class ReactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReactRequest
        fields = ('id', 'modelsNLP','methods','textThema')
