from rest_framework import serializers
from .models import DetallesPedidos

class DetallesPedidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallesPedidos
        fields = ['pedido', 'producto', 'cantidad', 'precio']
