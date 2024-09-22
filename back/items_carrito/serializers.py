from rest_framework import serializers
from .models import ItemsCarrito

class ItemCarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemsCarrito
        fields = ['carrito', 'producto', 'cantidad']
