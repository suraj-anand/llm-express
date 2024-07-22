# Generated by Django 4.2.14 on 2024-07-22 15:51

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSecrets',
            fields=[
                ('id', models.TextField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('hugging_face_token', models.TextField(blank=True, default='', null=True)),
                ('aws_access_key', models.TextField(blank=True, default='', null=True)),
                ('aws_secret_access_key', models.TextField(blank=True, default='', null=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
