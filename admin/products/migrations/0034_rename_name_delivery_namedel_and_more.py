# Generated by Django 4.2.4 on 2024-09-09 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0033_rename_namedel_delivery_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='delivery',
            old_name='name',
            new_name='nameDel',
        ),
        migrations.AlterField(
            model_name='delivery',
            name='deliveryStatus',
            field=models.CharField(default='Por enviar', max_length=20),
        ),
    ]