# Generated by Django 4.2.6 on 2024-06-25 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0025_alter_product_productdescription'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='productDescription',
            field=models.CharField(),
        ),
    ]
