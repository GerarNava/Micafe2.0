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
  // Estado local para el carrito, el total y el número de orden
  const [carritoLocal, setCarritoLocal] = useState(carrito);
  const [total, setTotal] = useState(
    Number(
      carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
    ).toFixed(2)
  );
  const [numeroOrden, setNumeroOrden] = useState(null);

  useEffect(() => {
    // Lógica para obtener el número de orden actual desde la API
    const obtenerNumeroOrden = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/orders');
        const data = await response.json();

        // Suponiendo que la respuesta tiene un array de pedidos y se utiliza el último elemento
        const ultimoPedido = data[data.length - 1];
        const numeroOrdenActual = ultimoPedido && ultimoPedido.n_orden;
        console.log('IdUsuario',user.id);
        // Incrementar el número de orden antes de establecerlo
        setNumeroOrden(numeroOrdenActual + 1);
      } catch (error) {
        console.error('Error al obtener el número de orden:', error);
      }
      
    };

    obtenerNumeroOrden();
  }, []); // Se ejecuta solo una vez al montar el componente

  const enviarPedido = async () => {
    

    const pedido = {
      description: carritoLocal.map((producto) => `${producto.nombre} (${producto.cantidad})`).join(', '),
      quantity: '1',
      total_price: total,
      user_id: clienteId,
      numero_orden: numeroOrden, // Incluye el número de orden en el objeto pedido
    };

    try {
      const response = await fetch('http://localhost:8000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        console.log('Pedido enviado con éxito');
      } else {
        console.error('Error al enviar el pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const cancelarPedido = () => {
    // Limpiar el carrito y restablecer las variables
    setCarrito([]);
    setTotal(0);
    setNumeroOrden(null);
    setCarritoLocal([]);
    // Otras acciones que desees realizar al cancelar el pedido
    console.log('Pedido cancelado');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="center-links">
          <div>
            <Link to="/perfil">
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
