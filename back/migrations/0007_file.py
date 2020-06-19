# Generated by Django 2.2.5 on 2020-06-19 12:06

import back.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0006_auto_20200619_1645'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to=back.models.get_file_path)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back.Task')),
            ],
        ),
    ]