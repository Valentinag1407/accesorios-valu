from django.urls import path
from .views import create, get

urlpatterns = [
    path('create/', create, name='create-pedidos'),
    path('get/', get, name='delete-pedidos'),
]

