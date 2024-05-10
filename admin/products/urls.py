from django.urls import path, include
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'product', views.getProduct, 'product')

urlpatterns = [
    path('category/<int:id>', views.getCategory),
    path('deleteCategory/',views.deleteCategory),
    path('category/', views.getCategory),
    path('product/<int:id>', views.getProduct),
    path('product/', views.getProduct),
    path('addProduct/', views.addProduct),
    path('statusProduct/',views.statusProduct),
    path('getCart/',views.getCart),
    path('getProductClient/',views.getProductClient),
    
    
]