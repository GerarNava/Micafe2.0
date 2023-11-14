import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';

const LoginAdmi = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.endsWith('@admi.com') && password) {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          // Autenticación exitosa
          const data = await response.json();

          // Guardar token JWT de manera segura (considera usar secure cookies)
          localStorage.setItem('token', data.token);

          // Redirigir a la página de éxito o realizar otras acciones necesarias
          alert('Inicio de sesión exitoso');
          navigate('/pageAdmi'); // Ajusta la ruta según tu configuración
        } else {
          // Manejar la autenticación fallida
          alert('Correo o contraseña inválidos. Verifica tus credenciales.');
        }
      } catch (error) {
        // Manejar errores de conexión o servidor
        console.error('Error en la solicitud:', error);
        alert('Hubo un error en la autenticación. Inténtalo de nuevo más tarde.');
      }
    } else {
      // Correo o contraseña no válidos
      alert('Por favor, ingresa un correo válido y una contraseña.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="container-with-green-background p-4">
            <h1>Mi cafe Umes</h1>
            <form onSubmit={handleLogin}>
              <h2>Iniciar Sesión</h2>
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
              <button type="submit" className="btn btn-primary btn-block">
                Iniciar Sesión
              </button>
              <p className="mt-3">
                ¿No tienes una cuenta? <Link to="/RegisterAdmi">Registrarse</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmi;
