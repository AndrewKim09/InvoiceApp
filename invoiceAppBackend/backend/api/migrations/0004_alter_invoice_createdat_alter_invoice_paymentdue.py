# Generated by Django 5.0.6 on 2024-07-15 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_post_code_address_postcode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='createdAt',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='paymentDue',
            field=models.CharField(max_length=10),
        ),
    ]
