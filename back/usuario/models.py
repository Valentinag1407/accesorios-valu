from django.contrib.auth.models import AbstractUser
from django.db import models
from roles.models import Rol

class Usuario(AbstractUser):
    email = models.EmailField(unique=True, max_length=250)
    celular = models.CharField(max_length=15, blank=True, null=True)
    direccion = models.CharField(max_length=250, blank=True, null=True)
    estado = models.BooleanField(default=True)
    departamento = models.CharField(max_length=100, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    barrio = models.CharField(max_length=100, blank=True, null=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
