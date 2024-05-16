from django.shortcuts import render
from django.contrib.auth.models import User
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
            product_quantity = item['quantity']  # Obtenemos el cantidad del producto
            product_total = item['total']  # Obtenemos el total del producto
            cart_id = item['id']  # Obtenemos el total del producto
            
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
                    'productCategory': product.productCategory.pk,  # Serialize ForeignKey as primary key
                    'quantity': product_quantity,
                    'total': product_total,
                    'id': cart_id
                }
                data.append(product_data)
        
        return Response(data, headers={'Mi-Encabezado': 'Valor del Encabezado'})

# Car 
@api_view(['POST'])
@permission_classes([AllowAny])
def addToCart(request):
    if request.method == 'POST':
        user = request.data.get('idUser')
        # idUser = User.objects.get(id=user)
        idProduct = request.data.get('idProduct')
        quantity = request.data.get('quantity')
        product = Product.objects.get(id=idProduct)
        total = product.productPrice * quantity
        cart = {
            'idUser': user,
            'idProduct': idProduct,
            'quantity': quantity,
            'total': total
            }
        existing_cart = Cart.objects.filter(idUser=user, idProduct=idProduct).first()
        if existing_cart:
            data = "No se puede agregar el mismo producto"
            return Response(data,status=400)
        else: 
            serializer = CartSerializer(data=cart)
            if serializer.is_valid():
                serializer.save()
                return Response(status=200) 
            else:
                return Response(serializer.errors,status=400)
    else:
        return Response(status=403)

@api_view(['POST'])
@permission_classes([AllowAny])
def addQuantityCart(request):
    if request.method == 'POST':
        cartId = request.data.get('cartId')
        cart = Cart.objects.get(id=cartId, idUser=request.user)
        cart2 = Cart.objects.filter(id=cartId, idUser=request.user)
        for cartP in cart2:
            cartProduct = cartP.idProduct.id
        quantity = request.data.get('quantity')
        product = Product.objects.get(id=cartProduct)
        total = product.productPrice * quantity
        data = {
            'quantity': quantity,
            'total': total
        }
        serializer = CartSerializer(cart,data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        else: 
            return Response(status=400)
    else: 
        return Response(status=404)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def RemoveQuantityCart(request):
    if request.method == 'POST':
        cartId = request.data.get('cartId')
        cart = Cart.objects.get(id=cartId, idUser=request.user)
        cart2 = Cart.objects.filter(id=cartId, idUser=request.user)
        for cartP in cart2:
            cartProduct = cartP.idProduct.id
        quantity = request.data.get('quantity')
        if quantity <= 0:
            cart.delete()
            data1 = "Se ha eliminado el producto del carro"
            return Response(data1,status=200)
        product = Product.objects.get(id=cartProduct)
        total = product.productPrice * quantity
        data = {
            'quantity': quantity,
            'total': total
        }
        serializer = CartSerializer(cart,data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        else: 
            return Response(status=400)
    else: 
        return Response(status=404)
    
    
@api_view(['GET'])
def getTotalCart(request):
    if request.method == 'GET':
        user_id = request.user.id
        if user_id:
            cart_items = Cart.objects.filter(idUser=user_id)
        else:
            return Response(status=400)
        
        total_quantity = 0  # Inicializamos la variable para la suma de las cantidades
        
        for cart_item in cart_items:
            total_quantity += cart_item.total  # Sumamos la cantidad del producto al total
            
        return Response(total_quantity,status=200)  # Enviamos el total como parte de la respuesta
