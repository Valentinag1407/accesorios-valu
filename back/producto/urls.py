from django.urls import path
from .views import product_list, product_detail

urlpatterns = [
    path('get/', product_list, name='product-list'), 
    path('products/', product_detail),
    path('products/<int:pk>/', product_detail),
]
