# Generated by Django 2.2.5 on 2020-06-19 08:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True)),
                ('text', models.TextField()),
                ('flag', models.CharField(max_length=70, unique=True)),
                ('active', models.BooleanField()),
                ('task_type', models.CharField(choices=[('stegano', 'stegano'), ('pwn', 'pwn'), ('ppc', 'pcc')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_flag', models.CharField(max_length=70)),
                ('right', models.BooleanField()),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back.Task')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
