import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    product_name: '',
    price: '',
    image: null,
    description: '',
    category: '',
   
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          alert('Error al obtener el producto. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al obtener el producto. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('product_name', product.product_name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('image', product.image);
      formData.append('category', product.category);

      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Cambios guardados exitosamente');
        navigate('/products');
      } else {
        alert('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al guardar los cambios. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      {/* Resto del código de tu componente */}
      <button onClick={handleSaveChanges}>Guardar Cambios</button>
    </div>
  );
};

export default ProductEdit;

