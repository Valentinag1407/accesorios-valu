from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=250)
    descripcion = models.CharField(max_length=250)
    
    def __str__(self):
        return self.nombre
    