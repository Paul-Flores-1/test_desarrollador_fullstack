from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Producto, Usuario

# Registramos tu usuario personalizado
admin.site.register(Usuario, UserAdmin)

# Registramos el modelo Producto y personalizamos cómo se ve en la lista
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'stock', 'estado', 'fecha_registro')
    list_filter = ('categoria', 'estado')
    search_fields = ('nombre', 'categoria')