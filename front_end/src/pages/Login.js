import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función de inicio de sesión desde el contexto

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.endsWith('@umes.edu.gt') && password) {
      try {
        const  user  = await login(email, password); // Usa la función de inicio de sesión del contexto

        // Redirigir a la página de éxito o realizar otras acciones necesarias
        alert('Inicio de sesión exitoso');
        console.log('Usuario autenticado:', user);
        navigate('/home');
      } catch (error) {
        // Manejar errores durante el inicio de sesión
        console.error('Error durante el inicio de sesión:', error.message);
        alert(error.message);
      }
    } else {
      alert('Por favor, ingresa un correo válido de umes.edu.gt y una contraseña.');
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
                ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
