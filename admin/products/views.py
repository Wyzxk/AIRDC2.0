from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import Product
from .serializer import ProductSerializer
from rest_framework.permissions import AllowAny
# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def getProduct(request,id=None):
    if id: 
        products = Product.objects.filter(id=id)
    else:
        products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)