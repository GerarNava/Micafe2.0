import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'; // Añade esta línea
import { Brother } from './Brother';

const MainComponent = () => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (productName, productPrice) => {
    setCarrito([...carrito, { nombre: productName, precio: productPrice, cantidad: 1 }]);
  };

  return (
    <Router>
      {/* Otras rutas si las tienes */}
      <Route path="/brother">
        <Brother addToCart={addToCart} />
      </Route>
    </Router>
  );
};

export default MainComponent;
