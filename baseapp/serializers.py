from django.contrib.auth import password_validation, get_user_model
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    access = serializers.SerializerMethodField(required=False)

    class Meta:
        model = User
        fields = 'username', 'first_name', 'last_name', 'email', 'last_login', 'date_joined', 'access'

    def get_access(self, obj):
        token = RefreshToken.for_user(self.instance)
        return str(token.access_token)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        del data['refresh']
        serializer = UserSerializer(self.user)
        data.update(serializer.data)
        return data


class UserCreationSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError('This username already exists.')
        return username

    def validate(self, attrs):
        user = User(username=attrs['username'])
        try:
            password_validation.validate_password(attrs['password'], user)
        except ValidationError as error:
            raise serializers.ValidationError(error.messages)
        return attrs

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
