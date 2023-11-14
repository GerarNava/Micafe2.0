import datetime
from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from datetime import datetime

from users.models import User
from .models import Order
from .serializers import OrderSerializer

# Lista todas las órdenes
class ListOrder(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# Crea una nueva orden
class CreateOrder(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# Actualiza una orden existente
class UpdateOrder(UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'pk'

# Elimina una orden existente
class DeleteOrder(DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


# Vista para consultar pedidos por usuario
class OrdersByUser(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']  # Obtener el ID del usuario de la URL
        try:
            user = User.objects.get(pk=user_id)  # Obtener el usuario
            return Order.objects.filter(user=user)  # Filtrar pedidos por usuario
        except User.DoesNotExist:
            return Order.objects.none()  # Si el usuario no existe, retornar una lista vacía

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    


# Vista para consultar pedidos por un día específico
class OrdersByDate(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        date_str = self.kwargs['date']  # Obtener la fecha de la URL
        try:
            # Convertir la fecha de cadena a objeto de fecha
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            return Order.objects.filter(created_at__date=date)  # Filtrar pedidos por fecha
        except ValueError:
            return Order.objects.none()  # Si la fecha no es válida, retornar una lista vacía

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
