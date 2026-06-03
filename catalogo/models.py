from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    """
    Modelo de usuario personalizado.
    Heredar de AbstractUser ya nos proporciona campos como:
    username, password, email, first_name, last_name, is_active, etc.
    """
    # Puedes agregar campos adicionales aquí si lo consideras necesario para el panel,
    # por ejemplo, un rol o teléfono, pero con los de AbstractUser es suficiente para la prueba.
    
    def __str__(self):
        return self.username


class Producto(models.Model):
    """
    Modelo para el catálogo de productos.
    """
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.CharField(max_length=100)
    stock = models.PositiveIntegerField(default=0)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    estado = models.BooleanField(default=True, help_text="True=Activo, False=Inactivo")

    def __str__(self):
        return f"{self.nombre} - {self.categoria}"