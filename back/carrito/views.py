from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Carrito
from items_carrito.models import ItemsCarrito
from producto.serializers import ProductoSerializer
from rest_framework import serializers

class ItemsCarritoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer() 

    class Meta:
        model = ItemsCarrito
        fields = ['producto', 'cantidad']

@api_view(['GET'])
def get(request, pk=None):
    if request.method == 'GET' and pk:
        try:
            user = get_user_model().objects.get(pk=pk)
            carrito = Carrito.objects.get(usuario=user)

            items = ItemsCarrito.objects.filter(carrito=carrito)
            items_serialized = ItemsCarritoSerializer(items, many=True)

            return Response({
                'carrito_id': carrito.id,
                'items': items_serialized.data
            }, status=status.HTTP_200_OK)

        except get_user_model().DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Carrito.DoesNotExist:
            return Response({'error': 'Carrito no encontrado para este usuario'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)