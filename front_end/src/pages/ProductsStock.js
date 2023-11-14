import React, { useEffect, useState } from 'react';
import '../css/pageAdmi.css';

const ProductsStock = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(0); // Estado inicial del filtro

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/orders/');
      const data = await response.json();
      //console.log('Datos de pedidos:', data);

      // No filtres localmente, obtén todas las órdenes del servidor y luego filtra
      setOrders(data);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = (orderId) => {
    // Lógica para editar una orden, por ejemplo, redirigir a una página de edición.
    // Puedes implementar esto según tus necesidades.
  };

  const handleToggleDelivered = async (orderId) => {
    try {
      // Actualiza el estado de la orden en el servidor
      await fetch(`http://localhost:8000/api/orders/update/${orderId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: !orders.find((order) => order.id === orderId).state }),
      });

      // Vuelve a realizar la solicitud para obtener las órdenes actualizadas
      fetchOrders();

     // console.log('Estado de entrega actualizado con éxito.');
    } catch (error) {
      console.error('Error al actualizar el estado de entrega:', error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filtra las órdenes según el estado deseado
  const filteredOrders = orders.filter((order) => (filter === 0 ? !order.state : order.state));

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Agrega el Sidebar aquí */}
        <Sidebar handleFilterChange={handleFilterChange} />
        {/* Resto del contenido */}
        <div className="col-md-9 col-lg-10 content">
          <div className="filter-buttons">
            <button
              className={`btn ${filter === 0 ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleFilterChange(0)}
            >
              Mostrar ordenes en espera
            </button>
            <button
              className={`btn ${filter === 1 ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleFilterChange(1)}
            >
              Mostrar ordenes entregadas
            </button>
          </div>
          <h1>ÓRDENES</h1>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Número de Orden</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Total a Pagar</th>
                  <th>Estado de Entrega</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.n_order}</td>
                    <td>{order.name}</td>
                    <td>{order.description}</td>
                    <td>{order.total_price}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={order.state}
                        onChange={() => handleToggleDelivered(order.id)}
                        disabled={order.state} // Deshabilita el checkbox si la orden está entregada
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleEdit(order.id)}
                      >
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
      </div>
    </div>
  );
};

function Sidebar({ handleFilterChange }) {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="/pageAdmi">Inicio</a></li>
        <li><a href="#">Usuarios</a></li>
        <li><a href="/products">Productos</a></li>
        <li><a href="/productsStock">Pedidos</a></li>
        <li><a href="/categoria">Categoria</a></li>
        <li><a href="/loginAdmin">Salir</a></li>
      </ul>
    </div>
  );
}

export default ProductsStock;
