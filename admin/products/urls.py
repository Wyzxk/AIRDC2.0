from django.urls import path, include
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'product', views.getProduct, 'product')

urlpatterns = [
    path('product/<int:id>', views.getProduct),
    path('product/', views.getProduct)
]