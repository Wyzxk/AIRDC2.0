# Generated by Django 4.2.6 on 2024-03-17 22:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0011_alter_useraddress_cpostal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraddress',
            name='cPostal',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='city',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='department',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='neighborhood',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='numberStreet',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='street',
            field=models.CharField(max_length=10),
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('names', models.CharField(max_length=50)),
                ('lastNames', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=10)),
                ('residenceCity', models.CharField(max_length=20)),
                ('typeId', models.CharField(max_length=3)),
                ('numberId', models.IntegerField(max_length=20)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
