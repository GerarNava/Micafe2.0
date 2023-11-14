from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id','n_order', 'user', 'name','state',  'description', 'observations', 'quantity', 'total_price']
