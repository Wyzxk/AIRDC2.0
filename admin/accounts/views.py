from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import UserAddress,InfoUser
from .serializers import userAddressSerializer, UserInfoSerializer

@api_view(['GET', 'POST', 'PUT'])
def insertUserAddress(request):
    if request.method == 'POST':
        user = request.data.get('user')
        department = request.data.get('department')
        city = request.data.get('city')
        neighborhood = request.data.get('neighborhood')
        cPostal = request.data.get('cPostal')
        street = request.data.get('street')
        numberStreet = request.data.get('numberStreet')
        aditionalInfo = request.data.get('aditionalInfo')
        serializer = userAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=200)  
        else:
            return Response(serializer.errors, status=400)
    elif request.method == 'GET':  
        user = request.query_params.get('user')
        data = UserAddress.objects.filter(user=user)
        if data.exists():
            serializer = userAddressSerializer(data, many=True)
            return Response(serializer.data, status=200)
        else:      
            return Response("No se encontraron direcciones para el usuario especificado", status=404)
    elif request.method == 'PUT':
        user = request.data.get('user')
        putUser = UserAddress.objects.get(user=user)
        serializer = userAddressSerializer(putUser, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
             return Response(serializer.errors, status=400)
    else:
        return Response(status=400)
        

@api_view(['POST'])
def changePassword(request):
    if request.method == 'POST':
        user = request.user
        currentPassword = request.data.get('password')
        newPassword = request.data.get('newPassword')
        newPasswordConfirm = request.data.get('newPasswordConfirm')
        if currentPassword and user.check_password(currentPassword):
            if newPassword == newPasswordConfirm:
                user.set_password(newPassword)
                user.save()
                response_data = {
                'message': 'La contraseña ha sido cambiada'
            }
                return Response(response_data, status=200)
            else:
                response_data = {
                'message': 'Las contraseñas no son iguales'
            }
                return Response(response_data, status=400)
        else:
            response_data = {
                'message': 'La contraseña es incorrecta'
            }
            return Response(response_data, status=400)
    else: 
        return Response(status=404)   

@api_view(['POST'])
def changeUser(request):
    if request.method == 'POST':
        user = request.user
        newUsername = request.data.get('newUsername')
        try:
            user.username = newUsername
            user.save()
            return Response(status=200)
        except:
            return Response(status=404)
    else:
        Response(status=404)
        
        
@api_view(['GET','POST','PUT'])
def infoUser(request):
    if request.method == 'POST':
        serializer = UserInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        else: 
            return Response(serializer.errors, status=400)
        
    elif request.method == 'GET':
        user = request.query_params.get('user')
        data = InfoUser.objects.filter(user=user)
        if data.exists():
            serializer = UserInfoSerializer(data, many=True)
            return Response(serializer.data, status=200)
        else:
            return Response(status=400)
        
    elif request.method == 'PUT':
        user = request.data.get('user')
        if user:
            putInfo = InfoUser.objects.get(user=user)
            serializer = UserInfoSerializer(putInfo,data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(status=200)
            else: 
                return Response(serializer.errors,status=400)
        else:
            return Response(status=404)
    else: 
        return Response(status=404)
    
@api_view(["GET"])
def checkStaff(request):
    if request.method == "GET":
        user = request.user
        if user:
            id = request.query_params.get('id')
            isStaff = user.is_staff
            return Response(isStaff,status=200)
        else:
            data = "No hay usuario"
            return Response(data, status=404)
    else:
        return Response(status=404)
