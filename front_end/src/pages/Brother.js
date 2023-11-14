// Brother.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import carrito from '../assets/car.png';
import perfil from '../assets/perfil.png';
import regresar from '../assets/return.png';
import '../css/Rome.css';

const Brother = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Agrega la lógica para cargar productos desde la API o donde sea necesario
    // Ejemplo:
    fetch('http://localhost:8000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="center-links">
          <div>
            <Link to="/listPedidos">
              <img src={perfil} alt="perfil" className="icon" />
            </Link>
            <Link to="/carrito">
              <img src={carrito} alt="carrito" className="icon" />
            </Link>
            <Link to="/home">
              <img src={regresar} alt="regresar" className="icon" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mt-5 container-with-green-background">
        <h1>Bienvenido a la cafetería Brothers</h1>
        <h2>Nuestros Productos</h2>
      </div>
      <div className="product-section">
        {products &&
          products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                <img src={product.image} width={150} alt={product.product_name} />
              </div>
              <div className="product-details">
                <h3>{product.product_name}</h3>
                <p>Precio: {product.price}</p>
                <button className="carrito-button" onClick={() => addToCart(product.product_name, product.price)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Brother;
