# Generated by Django 4.2.4 on 2024-09-09 07:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0034_rename_name_delivery_namedel_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='delivery',
            name='deliveryStatus',
        ),
        migrations.RemoveField(
            model_name='delivery',
            name='nameDel',
        ),
    ]
