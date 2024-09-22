from django.db import models
from django.contrib.auth import get_user_model
from estado_pedidos.models import EstadoPedidos

class Pedidos(models.Model):
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    total = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.ForeignKey(EstadoPedidos, on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        return self.usuario