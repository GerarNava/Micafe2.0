import React, { useEffect, useState } from 'react';
import '../css/products.css';
import '../css/table.css';

const Categoria = () => {
  const [category_name, setCategoryName] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category_name', category_name);

    try {
      const response = await fetch('http://localhost:8000/api/category/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Registro exitoso');
        setCategoryName('');
        obtenerCategorias();
      } else {
        alert('Error en el registro. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error en el registro. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const obtenerCategorias = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        console.error('Error al obtener categorías');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/category/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Categoría eliminada');
        obtenerCategorias();
      } else {
        alert('Error al eliminar la categoría. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al eliminar la categoría. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleEditarCategoria = (id) => {
    // Lógica para editar la categoría, por ejemplo, redireccionar a una página de edición
    console.log(`Editar categoría con ID: ${id}`);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <ul>
          <li><a href="/pageAdmi">Inicio</a></li>
          <li><a href="#">Usuarios</a></li>
          <li><a href="/products">Productos</a></li>
          <li><a href="/productsStock">Pedidos</a></li>
          <li><a href="/categoria">Categoría</a></li>
          <li><a href="/loginAdmin">Salir</a></li>
        </ul>
      </div>
      <div className="col-md-9 col-lg-10 content">
        <h1>Categorías</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Nueva categoría"
              value={category_name}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button type="submit">Agregar</button>
          </div>
        </form>

        <h2>Listado de Categorías</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.category_name}</td>
                <td>
                  <button onClick={() => handleEliminarCategoria(categoria.id)}>Eliminar</button>
                  <button onClick={() => handleEditarCategoria(categoria.id)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categoria;
