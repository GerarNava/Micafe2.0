import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    // Lógica para editar un producto, por ejemplo, redirigir a una página de edición.
    // Puedes implementar esto según tus necesidades.
    navigate(`/products/edit/${productId}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Producto eliminado exitosamente');
        // Actualizar la lista de productos después de eliminar uno
        fetchProducts();
      } else {
        alert('Error al eliminar el producto. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
    }
    // Lógica para eliminar un producto, por ejemplo, enviar una solicitud de eliminación al servidor.
    // Puedes implementar esto según tus necesidades.
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <Content products={products} handleEdit={handleEdit} handleDelete={handleDelete} fetchProducts={fetchProducts} />
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

function Content({ products, handleEdit, handleDelete, fetchProducts }) {
  return (
    <div className="col-md-9 col-lg-10 content d-flex justify-content-center">
      <div className="text-center">
        <h1>PRODUCTOS</h1>
        <Link to="/products/create" className="btn btn-primary productos-button">Agregar producto</Link>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.product_name}</td>
                  <td>{product.price}</td>
                  <td><img src={product.image} width = {100} alt={product.product_name} /></td>
                  <td>{product.description}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => handleEdit(product.id)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
