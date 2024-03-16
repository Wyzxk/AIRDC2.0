from djoser.serializers import UserCreateSerializer
from .models import UserAddress
from rest_framework import serializers
from django.contrib.auth import get_user_model

user = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = user 
        fields = ['id','email','name','password']
        
class userAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'