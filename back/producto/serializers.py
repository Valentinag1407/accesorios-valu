# myapp/serializers.py
from rest_framework import serializers
from .models import Producto
from categoria.serializers import CategoriaSerializer

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer() 

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'imagen', 'categoria', 'estado', 'cantidad', 'isFavorite']
