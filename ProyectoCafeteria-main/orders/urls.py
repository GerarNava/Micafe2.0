from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.ListOrder.as_view(), name='order-list'),
    path('orders/create/', views.CreateOrder.as_view(), name='order-create'),
    path('orders/update/<int:pk>/', views.UpdateOrder.as_view(), name='order-update'),
    path('orders/delete/<int:pk>/', views.DeleteOrder.as_view(), name='order-delete'),
    path('orders/by_user/<int:user_id>/', views.OrdersByUser.as_view(), name='orders-by-user'),
    path('orders/by_date/<str:date>/', views.OrdersByDate.as_view(), name='orders-by-date'),



]
