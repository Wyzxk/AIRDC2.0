# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# class UserAccountManager(BaseUserManager):
#     def create_user(self, email, name, password=None):
#         if not email:
#             raise ValueError('El usuario debe tener un correo electrónico')
        
#         email = self.normalize_email(email)
#         user = self.model(email=email, name=name)
        
#         user.set_password(password)
#         user.save()
        
#         return user
    
#     def create_superuser(self, email, name, password):
#         if not email:
#             raise ValueError('El superusuario debe tener un correo electrónico')
#         email = self.normalize_email(email)
#         user = self.model(email=email, name=name)
#         user.is_active = True
#         user.is_staff = True
#         user.is_superuser = True
#         user.set_password(password)
#         user.save()
#         return user
        
    

# class UserAccount(AbstractBaseUser,PermissionsMixin):
#     name = models.CharField(max_length=255)
#     email = models.CharField(max_length=255, unique=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=True)
#     is_superuser = models.BooleanField(default=True)
    
#     objects = UserAccountManager()
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name']
    
#     def get_name(self):
#         self.name
    
#     def __str__(self):
#         return self.email