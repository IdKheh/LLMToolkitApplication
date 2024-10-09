from django.db import models

# Create your models here.

class ReactRequest(models.Model):
    modelsNLP = models.TextField()
    methods = models.TextField()
    textThema = models.TextField()

    def _str_(self):
        return self.textThema