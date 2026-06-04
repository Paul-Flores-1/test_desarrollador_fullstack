from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView # <-- Importa esto
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from catalogo.views import vista_productos, vista_usuarios

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('catalogo.urls')),
    
    # Rutas para el Frontend
    path('', TemplateView.as_view(template_name='login.html'), name='login'),
    path('dashboard/', TemplateView.as_view(template_name='dashboard.html'), name='dashboard'),
    path('productos/', vista_productos, name='vista_productos'),
    path('usuarios/', vista_usuarios, name='vista_usuarios'),
]