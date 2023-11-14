from django.db import models




class Category(models.Model):
    category_name = models.CharField(max_length=255)

    def __str__(self):
        return self.category_name



class Product(models.Model):
    product_name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=255, null=True)
    category_name = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.product_name

