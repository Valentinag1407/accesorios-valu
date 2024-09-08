from django.db import models

class EstadoPedidos(models.Model):
    nombre = models.CharField(max_length=250)
    
    def __str__(self):
        return self.nombre
