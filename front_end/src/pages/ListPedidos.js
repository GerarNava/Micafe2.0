import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import carrito from '../assets/car.png';
import perfil from '../assets/perfil.png';
import regresar from '../assets/return.png';
import '../css/Rome.css';

const ListPedidos = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const clienteId = user && user.id;

    // Si no hay un ID de usuario, no intentes cargar los pedidos
    if (!clienteId) {
      console.error('ID de usuario no disponible.');
      return;
    }

    // Agrega la lógica para cargar pedidos del usuario desde la API
    fetch(`http://localhost:8000/api/orders/by_user/${clienteId}/`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, [user]);

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
            <Link to="/brother">
              <img src={regresar} alt="regresar" className="icon" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mt-5 container-with-green-background">
        <h1>Bienvenido a la cafetería Brothers</h1>
        <h2>Tus Pedidos</h2>
      </div>
      <div className="container mt-3">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Número de Orden</th>
                <th>Descripción</th>
                <th>Total a Pagar</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.n_order}</td>
                    <td>{order.description}</td>
                    <td>{order.total_price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListPedidos;
