from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import Product,CategoryProduct,Cart
from .serializer import ProductSerializer, CategorySelializer,CartSerializer
from rest_framework.permissions import AllowAny
# Create your views here.

@api_view(['GET','POST','PUT'])
@permission_classes([AllowAny])
def getCategory(request):
    if request.method == 'GET':
        id = request.query_params.get('id')
        if id:
            category = CategoryProduct.objects.filter(id=id)
        else:
            category = CategoryProduct.objects.all()
        serializer = CategorySelializer(category, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = CategorySelializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        else:
            return Response(serializer.errors,status=404)
    if request.method == 'PUT':
        id = request.data.get('id')
        if id:
            category = CategoryProduct.objects.get(id=id) 
            if category: 
                serializer = CategorySelializer(category, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=200)
                else: 
                    return Response(serializer.errors, status=404)
            else: 
                return Response(status=404)
        else: 
            return Response(status=404)
        
@api_view(['POST'])
def deleteCategory(request):
    if request.method == "POST":
        id = request.data.get('id')
        if id:
            category = CategoryProduct.objects.get(id=id)
            category.delete()
            return Response(status=200,data=id)
        else:
            return Response(status=400)
    else:
        return Response(status=404)


@api_view(['GET'])
@permission_classes([AllowAny])
def getProduct(request):
    if request.method == 'GET':
        id = request.query_params.get('id')
        if id:
            products = Product.objects.filter(id=id)
        else:
            products = Product.objects.all().order_by('productCategory__categoryName')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getProductClient(request):
    if request.method == 'GET':
        id = request.query_params.get('id')
        if id:
            products = Product.objects.filter(id=id)
        else:
            products = Product.objects.filter(productStatus=True).order_by('productCategory__categoryName')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
@api_view(['POST','PUT'])
@permission_classes([AllowAny])
def addProduct(request):
    if request.method == 'POST':
        user = True
        if user:
            data = request.data
            print(data)
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            data = "No tienes permisos para acceder aquí"
            return Response(data, status=403)
    # if request.method == 'GET':
    #     idMiembro = request.query_params.get('idMiembro')
    #     if idMiembro:
    #         try:    
    #             miembro = Miembros.objects.get(idMiembro=idMiembro)
    #             serializer = MiembrosSerializer(miembro)
    #             return Response(serializer.data, status=200)
    #         except Miembros.DoesNotExist:
    #             return Response({'message': 'Miembro no encontrado'}, status=404)
    #     else:
    #         miembros = Miembros.objects.all()
    #         serializer = MiembrosSerializer(miembros, many=True)
    #         return Response(serializer.data, status=200)
    if request.method == 'PUT':
        user = request.user
        if user.is_staff:
            id = request.data.get('id')
            setProduct = Product.objects.get(id=id)
            serializer = ProductSerializer(setProduct,data=request.data, partial=True)
            if serializer.is_valid():
                # Si no se proporciona una nueva imagen, simplemente guarda los datos sin actualizar la imagen
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            data = "No tienes permisos para acceder aquí"
            return Response(data, status=403)
    else:
        return Response(status=404)

@api_view(['POST'])
@permission_classes([AllowAny])
def statusProduct(request):
    if request.method == "POST":
        user = request.user 
        if user.is_staff:
            id = request.data.get('id')
            product = Product.objects.get(id=id)
            st = product.productStatus
            if(st == True):
                product.productStatus = False
                product.save()
            else:
                product.productStatus = True
                product.save()
            print(st)
            return Response(status=200)
        else:
            return Response(status=403)
    else: 
        return Response(status=404)

@api_view(['GET'])
def getCart(request):
    if request.method == 'GET':
        id = request.query_params.get('id')
        if id:
            cart = Cart.objects.filter(idUser=id)
        else:
            return Response(status=404)
        serializer = CartSerializer(cart, many=True)
        data = []
        # Obtener los nombres de los productos
        for item in serializer.data:
            product_id = item['idProduct']  # Obtenemos el ID del producto
            product = Product.objects.filter(id=product_id).first()  # Obtenemos el objeto del producto
            if product:
                product_data = {
                    'productName': product.productName,
                    'productCode': product.productCode,
                    'productDescription': product.productDescription,
                    'productPrice': product.productPrice,
                    'productImageUrl': product.productImageUrl.url,  # Encode the URL as utf-8
                    'productStatus': product.productStatus,
                    'productStock': product.productStock,
                    'productCategory': product.productCategory.pk  # Serialize ForeignKey as primary key
                }
                data.append(product_data)
        
        return Response(data)

