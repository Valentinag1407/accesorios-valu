from rest_framework import serializers
from .models import Pedidos
from estado_pedidos.models import EstadoPedidos
from detalles_pedido.models import DetallesPedidos
from usuario.serializers import UserSerializerPedido
from producto.serializers import ProductoSerializer

class PedidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedidos
        fields = ['usuario', 'total']

class EstadoPedidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPedidos
        fields = ['id', 'nombre']

class DetallesPedidosSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    class Meta:
        model = DetallesPedidos
        fields = ['producto', 'cantidad', 'precio']

class PedidosSerializerCustom(serializers.ModelSerializer):
    detalles_pedidos = DetallesPedidosSerializer(many=True, read_only=True, source='detallespedidos_set')
    usuario = UserSerializerPedido(read_only=True) 
    estado = EstadoPedidosSerializer(read_only=True)
    
    class Meta:
        model = Pedidos
        fields = ['id', 'usuario', 'total', 'fecha', 'estado', 'detalles_pedidos']
