# Generated by Django 4.2.6 on 2024-04-18 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_delete_productcategory'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='productCategory',
            field=models.CharField(null=True),
        ),
    ]