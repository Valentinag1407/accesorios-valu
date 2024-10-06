# myapp/serializers.py
from rest_framework import serializers
from .models import Producto
from categoria.models import Categoria

class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'imagen', 'categoria', 'estado', 'cantidad', 'isFavorite']
