import React, { useState } from 'react';
import '../css/pageAdmi.css';

const ProductsStock = () => {
  const [products, setProducts] = useState([]);

  const handleEdit = (productId) => {
    // Lógica para editar un producto, por ejemplo, redirigir a una página de edición.
    // Puedes implementar esto según tus necesidades.
  };

  const handleToggleDelivered = (productId) => {
    // Lógica para marcar o desmarcar un producto como entregado en el servidor.
    // Puedes implementar esto según tus necesidades.

    // Aquí podrías realizar una solicitud PATCH o PUT al servidor para actualizar el campo 'delivered'.
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <Content
          products={products}
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

function Content({ products, handleEdit, handleToggleDelivered }) {
  return (
    <div className="col-md-9 col-lg-10 content">
      <h1>PRODUCTOS EN STOCK</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Estado de Entrega</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <img src={product.image} alt={product.product_name} />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={product.delivered}
                    onChange={() => handleToggleDelivered(product.id)}
                  />
                </td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(product.id)}>Editar</button>
                  {/* Puedes agregar botones para eliminar productos aquí si es necesario */}
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
