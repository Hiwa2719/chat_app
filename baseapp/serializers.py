from django.contrib.auth import password_validation, get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.exceptions import ValidationError


User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        del data['refresh']
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
        return User.objects.create(**validated_data)
