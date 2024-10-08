# Generated by Django 4.2.6 on 2024-06-25 04:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0022_alter_product_productstock'),
    ]

    operations = [
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descript', models.TextField()),
                ('amount', models.CharField(max_length=100)),
                ('doctype', models.CharField(max_length=10)),
                ('phone', models.CharField(max_length=11)),
                ('docNumber', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('address', models.CharField(max_length=200)),
                ('paymentStatus', models.CharField(max_length=20)),
                ('idUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
