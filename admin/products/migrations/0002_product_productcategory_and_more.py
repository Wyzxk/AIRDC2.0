# Generated by Django 4.2.6 on 2024-04-17 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='productCategory',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='productImageUrl',
            field=models.ImageField(max_length=200, null=True, upload_to=''),
        ),
    ]
