// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Lógica para obtener el usuario actual, por ejemplo, desde un token almacenado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
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
        const data = await response.json();

        // Almacena el usuario en el estado y localStorage
        const loggedInUser = { id: data.id, name: data.name };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));

        // Muestra el token y el ID del usuario en la consola
        console.log('Token:', data.token);
        console.log('ID del usuario:', data.id);

        // Devuelve el usuario o cualquier otro dato que puedas necesitar
        return loggedInUser;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error durante el inicio de sesión.');
      }
    } catch (error) {
      // Manejar errores de conexión o servidor
      console.error('Error en la solicitud:', error);
      throw new Error('Ocurrió un error durante el inicio de sesión. Por favor, intenta de nuevo.');
    }
  };

  const logout = () => {
    // Lógica para cerrar sesión y limpiar el estado
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }

  const { user, login, logout } = authContext;

  return { user: user || null, login, logout };
};
