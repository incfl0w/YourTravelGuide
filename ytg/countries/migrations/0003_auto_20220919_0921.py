# Generated by Django 3.2.8 on 2022-09-19 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('countries', '0002_alter_vote_voter'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='photo',
            field=models.ImageField(blank=True, upload_to='cities'),
        ),
        migrations.AddField(
            model_name='country',
            name='photo',
            field=models.ImageField(blank=True, upload_to='countries'),
        ),
    ]
