from django.db import models
from django.contrib.auth import get_user_model
from estado_pedidos.models import EstadoPedidos

class Pedidos(models.Model):
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    total = models.IntegerField()
    estado = models.CharField(max_length=250)
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.ForeignKey(EstadoPedidos, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.usuario