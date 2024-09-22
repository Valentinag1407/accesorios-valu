from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from carrito.models import Carrito
from producto.models import Producto
from .models import ItemsCarrito
from django.contrib.auth import get_user_model

@api_view(['POST'])
def create(request):
    data = request.data
    carrito_id = data.get('carrito_id')
    producto_id = data.get('producto_id')
    cantidad = data.get('cantidad')

    try:
        carrito = Carrito.objects.get(id=carrito_id)
    except Carrito.DoesNotExist:
        return Response({'detail': 'Carrito no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        producto = Producto.objects.get(id=producto_id)
    except Producto.DoesNotExist:
        return Response({'detail': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    if cantidad < 0:
        return Response({'detail': 'La cantidad debe ser mayor o igual a cero.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        item = ItemsCarrito.objects.get(carrito=carrito, producto=producto)
        item.cantidad = cantidad

        if item.cantidad <= 0:
            item.delete() 
        else:
            item.save()
    except ItemsCarrito.DoesNotExist:
        if cantidad > 0:
            ItemsCarrito.objects.create(carrito=carrito, producto=producto, cantidad=cantidad)

    return Response(status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def delete(request, pk=None):
    if request.method == 'DELETE' and pk:
        try:
            user = get_user_model().objects.get(pk=pk)
            carrito = Carrito.objects.get(usuario=user)
            items = ItemsCarrito.objects.filter(carrito=carrito)
            items.delete()

            return Response({'message': 'Carrito eliminado correctamente'}, status=status.HTTP_200_OK)

        except get_user_model().DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Carrito.DoesNotExist:
            return Response({'error': 'Carrito no encontrado para este usuario'}, status=status.HTTP_404_NOT_FOUND)