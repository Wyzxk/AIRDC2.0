from django.db import models

# Create your models here.

class Product(models.Model):
    productName = models.CharField(max_length=50)
    productCode = models.IntegerField()
    productDescription = models.CharField()
    productPrice = models.IntegerField()
    productImageUrl = models.CharField(max_length=200, blank=True, null=True)
    productStatus = models.BooleanField()
    
    
    
    