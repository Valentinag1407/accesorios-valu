from django.urls import path
from .views import get

urlpatterns = [
    path('get/<int:pk>/', get, name='get-carrito'),
]
