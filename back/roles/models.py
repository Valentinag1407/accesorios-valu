from django.db import models

class Rol(models.Model):
    nombre = models.CharField(max_length=250)
    estado = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nombre
