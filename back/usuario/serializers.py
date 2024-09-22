from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username', 'password', 'email', 'first_name', 'last_name',
            'celular', 'direccion', 'estado', 'departamento', 'ciudad',
            'barrio', 'rol'
        )
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            celular=validated_data.get('celular', ''),
            direccion=validated_data.get('direccion', ''),
            estado=validated_data.get('estado', True),
            departamento=validated_data.get('departamento', ''),
            ciudad=validated_data.get('ciudad', ''),
            barrio=validated_data.get('barrio', ''),
            rol=validated_data.get('rol', None)
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.BooleanField(source='is_superuser')

    class Meta:
        model = User
        fields = ['username', 'email', 'is_admin', 'id']
        
class UserSerializerPedido(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['barrio', 'celular', 'ciudad', 'departamento', 'direccion', 'email', 'estado', 'first_name', 'id', 'last_name', 'username']


