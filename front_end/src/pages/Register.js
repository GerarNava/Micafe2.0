import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email.endsWith('@umes.edu.gt')) {
      const userData = {
        email: email,
        password: password,
        name: name,
      };
      try {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.status === 200) {
          alert('Registro exitoso');
          // Aquí puedes redirigir al usuario a una página de inicio de sesión u otra página relevante.
        } else {
          alert('Error en el registro. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error en el registro. Por favor, inténtalo de nuevo más tarde.');
      }
      
      alert('Registro exitoso');
    } else {
      alert('Correo inválido. Debe ser @umes.edu.gt');
    }
  };

  return (
    <div className="container mt-5 container-with-green-background">
      <h1>Mi cafe Umes</h1>
      <form onSubmit={handleRegister}>
      <h2>Registrarse</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn btn-primary  btn-block">
          Registrarse
        </button>
      </form>

      {/* Agregar botón de regreso al login */}
      <Link to="/" className="btn btn-secondary mt-3">
        Regresar a Inicio de Sesión
      </Link>
    </div>
  );
};

export default Register;
