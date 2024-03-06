from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializer import ContactSerializer

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def sendMessage(request):
    if request.method == 'POST':
        email = request.data.get('email')
        name = request.data.get('name')
        topic = request.data.get('topic')
        message = request.data.get('message')
        

        # Si tiene todos los datos y son validos los guarda 
        if email and name and topic and message:
            serializer = ContactSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()   
                # Send email
                eTopic = topic
                eMessage = "Mensaje: " + message + "\n" + "Nombre: " + name +"\n" + "Email: " + email
                eEmail = settings.EMAIL_HOST_USER
                recipient = ["jhonkerteje1@gmail.com"]
                send_mail(eTopic,eMessage,eEmail,recipient)
                
                return Response({'message': 'Datos guardados correctamente'}, status=200)
            else:
                return Response({'error': 'Verificar los datos del formulario'}, status=400)
        else:
            return Response({'error': 'Faltan datos en el formulario'}, status=400)
