# Generated by Django 4.2.14 on 2024-07-22 16:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_usersecrets'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersecrets',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user', unique=True),
        ),
    ]
