import csv
from django.http import HttpResponse
from django.shortcuts import render  
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Producto, Usuario
from .serializers import ProductoSerializer, UsuarioSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    """
    CRUD para usuarios.
    Lectura: Todos los usuarios autenticados.
    Escritura/Eliminación: Solo administradores.
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        # Si la acción es 'list' (ver todos) o 'retrieve' (ver uno solo)
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        # Para crear, actualizar o eliminar
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class ProductoViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para el catálogo de productos.
    Protegido por JWT.
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]


# --- FUNCIÓN PARA EL REPORTE ---

def exportar_reporte_csv(request):
    """
    Genera un archivo CSV con el inventario actual de productos.
    """
    response = HttpResponse(content_type='text/csv')
    
    fecha_actual = timezone.now().strftime('%Y-%m-%d')
    response['Content-Disposition'] = f'attachment; filename="reporte_inventario_{fecha_actual}.csv"'

    writer = csv.writer(response)
    
    writer.writerow(['ID', 'Nombre', 'Categoría', 'Precio', 'Stock', 'Estado', 'Fecha Registro'])

    productos = Producto.objects.all().values_list(
        'id', 'nombre', 'categoria', 'precio', 'stock', 'estado', 'fecha_registro'
    )
    
    for producto in productos:
        estado_texto = "Activo" if producto[5] else "Inactivo"
        
        fila = [
            producto[0],
            producto[1],
            producto[2],
            producto[3],
            producto[4],
            estado_texto,
            producto[6].strftime('%Y-%m-%d %H:%M') 
        ]
        writer.writerow(fila)

    return response


# NUEVAS VISTAS PARA EL FRONTEND

def dashboard_view(request):
    """Renderiza la vista principal de resumen"""
    return render(request, 'dashboard.html')

def vista_productos(request):
    """Renderiza la vista dedicada a la gestión de productos"""
    return render(request, 'productos.html')

def vista_usuarios(request):
    """Renderiza la vista dedicada a la administración de usuarios"""
    return render(request, 'usuarios.html')