from django.urls import path
from .views import ListProduct, CreateProduct, UpdateProduct, DeleteProduct, ListCategory, CreateCategory, UpdateCategory, DeleteCategory
urlpatterns = [
    
    #PRODUCTS
    path('products', ListProduct.as_view()),
    path('products/create', CreateProduct.as_view()),
    path('products/<int:pk>/', UpdateProduct.as_view()),
    path('products/delete/<int:pk>/', DeleteProduct.as_view()),

    #PRODUCTS
    path('categories', ListCategory.as_view()),
    path('category/create', CreateCategory.as_view()),
    path('category/<int:pk>/', UpdateCategory.as_view()),
    path('category/delete/<int:pk>/', DeleteCategory.as_view()),

]
