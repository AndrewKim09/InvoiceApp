# Generated by Django 5.0.6 on 2024-07-15 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_invoice_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='createdAt',
            field=models.CharField(max_length=11),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='paymentDue',
            field=models.CharField(max_length=11),
        ),
    ]
