import csv
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Producto, Usuario
from .serializers import ProductoSerializer, UsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para la administración de usuarios.
    Protegido por JWT.
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]


class ProductoViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para el catálogo de productos.
    Protegido por JWT.
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]


# --- NUEVA FUNCIÓN PARA EL REPORTE ---

def exportar_reporte_csv(request):
    """
    Genera un archivo CSV con el inventario actual de productos.
    """
    # Configuramos la respuesta HTTP para que el navegador descargue un archivo
    response = HttpResponse(content_type='text/csv')
    
    # Nombramos el archivo con la fecha actual
    fecha_actual = timezone.now().strftime('%Y-%m-%d')
    response['Content-Disposition'] = f'attachment; filename="reporte_inventario_{fecha_actual}.csv"'

    # Inicializamos el escritor CSV
    writer = csv.writer(response)
    
    # 1. Escribimos los encabezados (la primera fila)
    writer.writerow(['ID', 'Nombre', 'Categoría', 'Precio', 'Stock', 'Estado', 'Fecha Registro'])

    # 2. Obtenemos todos los productos de la base de datos
    productos = Producto.objects.all().values_list(
        'id', 'nombre', 'categoria', 'precio', 'stock', 'estado', 'fecha_registro'
    )
    
    # 3. Recorremos los productos y los escribimos fila por fila
    for producto in productos:
        # Convertimos el True/False a un texto más legible para el reporte
        estado_texto = "Activo" if producto[5] else "Inactivo"
        
        fila = [
            producto[0],
            producto[1],
            producto[2],
            producto[3],
            producto[4],
            estado_texto,
            producto[6].strftime('%Y-%m-%d %H:%M') # Formateamos la fecha
        ]
        writer.writerow(fila)

    return response