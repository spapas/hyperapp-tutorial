# Generated by Django 2.0.9 on 2018-11-06 13:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20180323_1102'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='movie',
        ),
        migrations.DeleteModel(
            name='Image',
        ),
    ]
