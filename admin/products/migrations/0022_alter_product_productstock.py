# Generated by Django 4.2.6 on 2024-05-03 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0021_alter_product_productcategory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='productStock',
            field=models.IntegerField(default=0),
        ),
    ]
