from django.db import models
from django.contrib.auth import get_user_model

class Carrito(models.Model):
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.usuario
