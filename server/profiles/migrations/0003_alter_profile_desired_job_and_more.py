# Generated by Django 4.1.6 on 2023-02-11 07:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("profiles", "0002_profile_position"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="desired_job",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="profile",
            name="desired_location",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="profile",
            name="position",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
