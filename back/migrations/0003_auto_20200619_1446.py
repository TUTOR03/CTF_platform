# Generated by Django 2.2.5 on 2020-06-19 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0002_task_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='slug',
            field=models.SlugField(allow_unicode=True, blank=True, null=True, unique=True),
        ),
    ]