# Generated by Django 4.1.1 on 2022-09-23 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("countries", "0006_place"),
    ]

    operations = [
        migrations.AddField(
            model_name="country",
            name="capital",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="capital_city",
                to="countries.city",
            ),
        ),
    ]