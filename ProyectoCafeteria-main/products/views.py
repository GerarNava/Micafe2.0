from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response  
from products.serializers import ProductSerializer, CategorySerializer
from .models import Product, Category



#--------------PRODUCTS------------------------- 

class ListProduct(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    

class CreateProduct(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



class UpdateProduct(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)  

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


class DeleteProduct(DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer




#--------------CATEGORY------------------------- 



class ListCategory(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer



class CreateCategory(CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class UpdateCategory(UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)  

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


class DeleteCategory(DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


