# Generated by Django 4.2.6 on 2024-03-17 22:21

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0012_alter_useraddress_cpostal_alter_useraddress_city_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserInfo',
            new_name='infoUser',
        ),
    ]
