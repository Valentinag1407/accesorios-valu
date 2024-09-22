from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import DetallesPedidos
from .serializers import DetallesPedidosSerializer  # Asegúrate de tener un serializer para DetallesPedidos

@api_view(['POST'])
def create(request):
    serializer = DetallesPedidosSerializer(data=request.data, many=True)
    
    if serializer.is_valid():
        detalles = serializer.save() 
        detalles_ids = [detalle.id for detalle in detalles]
        return Response({'detalles_ids': detalles_ids}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
