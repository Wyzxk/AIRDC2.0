# Generated by Django 4.2.6 on 2024-04-18 21:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_alter_product_productcategory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='productCategory',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.productcategory'),
        ),
    ]