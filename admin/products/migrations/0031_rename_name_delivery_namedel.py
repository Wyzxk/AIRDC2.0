# Generated by Django 4.2.4 on 2024-09-09 07:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0030_delivery_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='delivery',
            old_name='name',
            new_name='nameDel',
        ),
    ]
