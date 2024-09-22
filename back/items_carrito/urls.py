from django.urls import path
from .views import create, delete

urlpatterns = [
    path('create/', create, name='token_obtain_pair'),
    path('delete/<int:pk>/', delete, name='delete-carrito'),
] 
