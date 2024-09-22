from django.urls import path
from .views import product_list, product_detail, favorites, getByCategory

urlpatterns = [
    path('get/', product_list, name='product-list'), 
    path('products/', product_detail),
    path('products/<int:pk>/', product_detail),
    path('getFavorites/', favorites, name='favorites'),
    path('getByCategory/<int:pk>/', getByCategory, name='getByCategory'),
]
