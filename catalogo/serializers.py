from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Producto, Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        # Campos que vamos a mostrar/pedir
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'is_active']
        # Ocultamos la contraseña para que no se envíe al leer los datos
        extra_kwargs = {'password': {'write_only': True}}

    # Sobrescribimos el método create para encriptar la contraseña correctamente
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'  