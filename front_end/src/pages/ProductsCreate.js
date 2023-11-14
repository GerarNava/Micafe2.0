import React, { useEffect, useState } from 'react';
import '../css/Product.css';

const ProductsCreate = () => {
  const [product_name, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Función para obtener la lista de categorías desde la API
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      const data = await response.json();

      if (response.ok) {
        setCategories(data);
      } else {
        console.error('Error al obtener las categorías');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    // Llamada a la función de obtener categorías al cargar el componente
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', product_name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8000/api/products/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Registro exitoso');

        // Limpiar campos después del éxito
        setProduct('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImage('');
      } else {
        alert('Error en el registro. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error en el registro. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddCategory = () => {
    alert(`Nueva categoría agregada: ${category}`);
    handleCloseModal();
  };

  return (
    <div className="App">
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

      <div className="content">
        <h1 className="text-center mb-4">Agregar Producto</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre del producto</label>
            <br />
            <input type="text" className="form-control" id="nombre" value={product_name} onChange={(e) => setProduct(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="precio" className="form-label">Precio</label>
            <br />
            <input type="text" className="form-control" id="precio" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <br />
            <textarea
              className="form-control"
              id="descripcion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <br />
            <select
              className="form-control"
              id="categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleccionar Categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="imagen" className="form-label"> URL Imagen</label>
            <br />
            <textarea type="file" className="form-control" id="imagen" onChange={(e) => setImage(e.target.value)} />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Agregar</button>
            <button type="button" className="btn btn-secondary">Cancelar</button>
          </div>
        </form>

        {/* Agrega aquí el código para mostrar la tabla de categorías */}
      </div>
    </div>
  );
};

export default ProductsCreate;
