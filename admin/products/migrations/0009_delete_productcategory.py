# Generated by Django 4.2.6 on 2024-04-18 21:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_remove_product_productcategory'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ProductCategory',
        ),
    ]
