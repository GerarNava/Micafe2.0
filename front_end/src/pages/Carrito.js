import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import car from '../assets/car.png';
import perfil from '../assets/perfil.png';
import regresar from '../assets/return.png';
import '../css/Carrito.css';
import '../css/Rome.css';

export const Carrito = ({ carrito, setCarrito }) => {
  const { user } = useAuth();
  const clienteId = user && user.id;

  const [carritoLocal, setCarritoLocal] = useState(carrito);
  const [total, setTotal] = useState(
    Number(
      carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
    ).toFixed(2)
  );
  const [numeroOrden, setNumeroOrden] = useState(null);

  useEffect(() => {
    const obtenerNumeroOrden = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/orders/');
        const data = await response.json();
        const ultimoPedido = data[data.length - 1];
        const numeroOrdenActual = ultimoPedido && ultimoPedido.n_order;
        setNumeroOrden(numeroOrdenActual ? parseInt(numeroOrdenActual) + 1 : 1);
      } catch (error) {
        console.error('Error al obtener el número de orden:', error);
      }
    };

    obtenerNumeroOrden();
  }, []);

  const enviarPedido = async () => {
    const fechaActual = new Date().toISOString();

    const formData = new FormData();
    formData.append('n_order', numeroOrden);
    formData.append('user', clienteId);
    formData.append('description', carritoLocal.map((producto) => `${producto.nombre} (${producto.cantidad})`).join(', '));
    formData.append('quantity', '1');
    formData.append('total_price', total);
    formData.append('created_at', fechaActual);

    // Imprime los datos antes de hacer la solicitud
    console.log('Datos a enviar:', Object.fromEntries(formData.entries()));

    try {
      const response = await fetch('http://localhost:8000/api/orders/create/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Pedido enviado con éxito');
        // Puedes realizar acciones adicionales después de enviar el pedido si es necesario
      } else {
        console.error('Error al enviar el pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }

    setCarrito([]);
    setTotal(0);
    setNumeroOrden(null);
    setCarritoLocal([]);
  };

  const cancelarPedido = () => {
    setCarrito([]);
    setTotal(0);
    setNumeroOrden(null);
    setCarritoLocal([]);
    console.log('Pedido cancelado');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="center-links">
          <div>
            <Link to="/listPedidos">
              <img src={perfil} alt="perfil" className="icon" />
            </Link>
            <Link to="/carrito">
              <img src={car} alt="carrito" className="icon" />
            </Link>
            <Link to="/brother">
              <img src={regresar} alt="regresar" className="icon" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="carrito-container">
        <h2>Carrito de Compras</h2>
        <table className="carrito-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {carritoLocal.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>Q{producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>Q{producto.precio * producto.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="carrito-total">
          Total: Q{total}
        </h3>
        <div className="carrito-botones">
          <button className="carrito-button" onClick={enviarPedido}>
            Enviar Pedido
          </button>
          <button className="carrito-button" onClick={cancelarPedido}>
            Cancelar Pedido
          </button>
        </div>
        <div className="productos">{/* Contenido de productos disponibles */}</div>
      </div>
    </div>
  );
};
