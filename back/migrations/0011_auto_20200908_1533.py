# Generated by Django 2.2.5 on 2020-09-08 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0010_auto_20200819_0314'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='task_type',
            field=models.CharField(choices=[('stegano', 'stegano'), ('pwn', 'pwn'), ('ppc', 'pcc'), ('joy', 'joy'), ('crypto', 'crypto'), ('osint', 'osint'), ('web', 'web'), ('forensics', 'forensics')], max_length=50),
        ),
    ]