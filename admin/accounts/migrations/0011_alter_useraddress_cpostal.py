# Generated by Django 4.2.4 on 2024-03-13 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraddress',
            name='cPostal',
            field=models.CharField(),
        ),
    ]
