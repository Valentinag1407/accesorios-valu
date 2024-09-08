from django.db import models
from categoria.models import Categoria

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField()
    imagen = models.ImageField(upload_to='images/')
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    estado = models.BooleanField(default=True)
    cantidad = models.IntegerField(default=0)
    
    def __str__(self):
        return self.nombre
