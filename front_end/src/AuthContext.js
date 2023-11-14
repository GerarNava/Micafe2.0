// AuthContext.js
import jwtDecode from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
        const decodedToken = jwtDecode(data.jwt);

        const loggedInUser = { id: decodedToken.id, name: decodedToken.name };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));

        //console.log('Token:', data.jwt);
        //console.log('ID del usuario:', loggedInUser.id);

        return loggedInUser;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error durante el inicio de sesión.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw new Error('Ocurrió un error durante el inicio de sesión. Por favor, intenta de nuevo.');
    }
  };

  const logout = () => {
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
