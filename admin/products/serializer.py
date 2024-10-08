from rest_framework import serializers
from .models import Product,CategoryProduct,Cart,Delivery

class ProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Product
        fields = '__all__'

class CategorySelializer(serializers.ModelSerializer):
    class Meta: 
        model = CategoryProduct
        fields = '__all__'
        
class CartSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Cart
        fields = '__all__'
        
class DeliverySerializer(serializers.ModelSerializer):
    class Meta: 
        model = Delivery
        fields = '__all__'