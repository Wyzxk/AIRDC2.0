from django.urls import path, include
from .views import insertUserAddress,changePassword,changeUser

urlpatterns = [
    path('',include('djoser.urls')),
    path('',include('djoser.urls.jwt')),
    path('userAddress/', insertUserAddress),
    path('changePassword/', changePassword),
    path('changeUser/', changeUser)
]

