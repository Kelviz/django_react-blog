# Generated by Django 4.0.4 on 2023-07-07 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_api', '0002_post_created_post_published_post_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='featured',
            field=models.BooleanField(default=False),
        ),
    ]
