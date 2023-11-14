from django.db import models
from products.models import Product
from users.models import User

class Order(models.Model):
    n_order = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField(null=True)
    state = models.BooleanField(default=False)
    products = models.ManyToManyField(Product)
    description = models.TextField()
    observations = models.TextField(null=True)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True, null=True)  # Campo de fecha de creación con auto_now_add

    def __str__(self):
        return f"Order for {self.user} - {self.total_price}"
