# Generated by Django 4.2.6 on 2024-03-17 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_rename_userinfo_infouser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='infouser',
            name='numberId',
            field=models.IntegerField(),
        ),
    ]
