from django.contrib import admin
from .models import Product,CategoryProduct,Cart,Delivery

# Register your models here.
admin.site.register(Product)
admin.site.register(CategoryProduct)
admin.site.register(Cart)
admin.site.register(Delivery)



