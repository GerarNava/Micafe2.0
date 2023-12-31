# Generated by Django 4.2.3 on 2023-11-14 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_order_n_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='name',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='observations',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='state',
            field=models.BooleanField(default=False),
        ),
    ]
