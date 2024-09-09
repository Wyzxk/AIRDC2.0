from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class CategoryProduct(models.Model):
    categoryName = models.CharField(max_length=50)
    categoryDescription = models.CharField(max_length=200)
    categoryStatus = models.BooleanField(default=True)
    
class Product(models.Model):
    productName = models.CharField(max_length=100)
    productCode = models.IntegerField()
    productDescription = models.CharField()
    productPrice = models.IntegerField()
    productImageUrl = models.ImageField(upload_to='productos/')
    productStatus = models.BooleanField()
    productStock = models.IntegerField(default=0)
    productCategory = models.ForeignKey(CategoryProduct, on_delete=models.CASCADE)

class Cart(models.Model):
    idUser = models.ForeignKey(User, on_delete=models.CASCADE)
    idProduct=models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    total = models.IntegerField(default=0)


class Delivery(models.Model):
    descript = models.TextField()
    idUser = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.CharField(max_length=100)  
    doctype = models.CharField(max_length=10) 
    phone = models.CharField(max_length=11)
    docNumber = models.CharField(max_length=30)
    email = models.EmailField()
    address = models.CharField(max_length=200)
    transaction = models.CharField(max_length=200, null=True)
    paymentStatus = models.CharField(max_length=20)
    deliveryStatus = models.CharField(max_length=20, default=False)