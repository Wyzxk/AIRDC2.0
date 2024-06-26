# Generated by Django 4.2.4 on 2024-03-13 00:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0009_delete_useraccount'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=30)),
                ('neighborhood', models.CharField(max_length=30)),
                ('cPostal', models.IntegerField()),
                ('street', models.CharField(max_length=30)),
                ('numberStreet', models.CharField(max_length=30)),
                ('aditionalInfo', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
