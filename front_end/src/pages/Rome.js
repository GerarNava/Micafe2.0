import React from 'react';
import { Link } from 'react-router-dom';
import carrito from '../assets/car.png'; // Asegúrate de tener la ruta correcta
import perfil from '../assets/perfil.png'; // Asegúrate de tener la ruta correcta
import regresar from '../assets/return.png';
import '../css/Rome.css';

export const Rome = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="center-links">
          <div >
            <Link to="/perfil">
              <img src={perfil} alt="perfil" className="icon" />
            </Link>
            <Link to="/carrito">
              <img src={carrito} alt="carrito" className="icon" />
            </Link>
            <Link to="/listProducts">
              <img src={regresar} alt="regresar" className="icon" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mt-5 container-with-green-background">
        <h1>Bienvenido a la cafeteria Rome</h1>
      </div>
      <div className="product-section">
        <h2>Nuestros Productos</h2>
        {/* Agregar lista de productos aquí */}
      </div>
    </div>
  );
}
