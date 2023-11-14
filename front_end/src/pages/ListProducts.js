import React, { useState } from 'react';
import '../css/Product.css';

export const ListProducts = () => {
 
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    {
      const userData = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        categoria: categoria ,
      };
      try {
        const response = await fetch('http://localhost:8000/api/products/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.status === 200) {
          alert('Registro exitoso');
         
        } else {
          alert('Error en el registro. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        //console.error('Error en la solicitud:', error);
        alert('Ocurrió un error en el registro. Por favor, inténtalo de nuevo más tarde.');
      }
      
      alert('Registro exitoso');
    } 
    // Aquí puedes realizar alguna acción con los datos ingresados, como enviarlos a un servidor o guardarlos en el estado de tu aplicación
    //console.log('Precio:', precio);
    //console.log('Imagen:', imagen);
    //console.log('Nombre del Producto:', nombre);
  };

  return (
    <div className="container mt-5 container-with-green-background">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Agregar Producto</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre del producto</label>
              <br></br>
              <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label htmlFor="precio" className="form-label">Precio</label>
              <br></br>
              <input type="text" className="form-control" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </div>
            
            <div className="form-group">
              <label htmlFor="imagen" className="form-label">Imagen</label>
              <br></br>
              <input type="file" className="form-control" id="imagen" onChange={(e) => setImagen(e.target.files[0])} />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Agregar</button>
              <button type="button" className="btn btn-secondary">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
  




</div>

  )
}


