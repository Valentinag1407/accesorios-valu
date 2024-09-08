from django.db import models
from carrito.models import Carrito
from producto.models import Producto

class ItemsCarrito(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    
    def __str__(self):
        return self.carrito