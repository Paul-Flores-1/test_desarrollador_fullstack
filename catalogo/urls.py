from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, UsuarioViewSet, exportar_reporte_csv

# El Router crea automáticamente las URLs para nuestro CRUD
router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    # Incluimos todas las rutas generadas por el router
    path('', include(router.urls)),
    path('reportes/exportar/', exportar_reporte_csv, name='exportar_reporte'),
]