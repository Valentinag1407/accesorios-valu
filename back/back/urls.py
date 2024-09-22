from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import  TokenRefreshView
from usuario.views import verify_token, CustomTokenObtainPairView, RegisterView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/', include('usuario.urls'), name='usuarios'),
    path('productos/', include('producto.urls'), name='productos'),
    path('categorias/', include('categoria.urls'), name='categorias'),
    path('carrito/', include('carrito.urls'), name='carrito'),
    path('pedidos/', include('pedidos.urls'), name='pedidos'),
    path('detalles_pedido/', include('detalles_pedido.urls'), name='detalle_pedidos'),
    path('items_carrito/', include('items_carrito.urls'), name='items_carrito'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/verify-token/', verify_token, name='verify_token'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
