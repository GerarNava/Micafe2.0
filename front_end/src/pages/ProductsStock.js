import React, { useEffect, useState } from 'react';
import '../css/pageAdmi.css';

const ProductsStock = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/orders/');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error al obtener las órdenes:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (orderId) => {
    // Lógica para editar una orden, por ejemplo, redirigir a una página de edición.
    // Puedes implementar esto según tus necesidades.
  };

  const handleToggleDelivered = (orderId) => {
    // Lógica para marcar o desmarcar una orden como entregada en el servidor.
    // Puedes implementar esto según tus necesidades.

    // Aquí podrías realizar una solicitud PATCH o PUT al servidor para actualizar el campo 'delivered'.
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <Content
          orders={orders}
          handleEdit={handleEdit}
          handleToggleDelivered={handleToggleDelivered}
        />
      </div>
    </div>
  );
};

function Sidebar() {
  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="/pageAdmi">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Usuarios</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/products">Productos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/productsStock">Pedidos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/categoria">Categoria</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/loginAdmin">Salir</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Content({ orders, handleEdit, handleToggleDelivered }) {
  const [usernames, setUsernames] = useState({});

  

  useEffect(() => {
   
  }, [orders]);

  return (
    <div className="col-md-9 col-lg-10 content">
      <h1>ÓRDENES</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Número de Orden</th>
              <th>ID del Usuario</th>
              <th>Descripción</th>
              <th>Total a Pagar</th>
              <th>Estado de Entrega</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.n_order}</td>
                <td>{order.user}</td>
                <td>{order.description}</td>
                <td>{order.total_price}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={order.delivered}
                    onChange={() => handleToggleDelivered(order.id)}
                  />
                </td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(order.id)}>
                    Editar
                  </button>
                  {/* Puedes agregar botones para eliminar órdenes aquí si es necesario */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsStock;
