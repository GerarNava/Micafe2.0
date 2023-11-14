import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContext';
import Brother from './pages/Brother';
import { Carrito } from './pages/Carrito';
import ListPedidos from './pages/ListPedidos';
import { ListProducts } from './pages/ListProducts';
import Login from './pages/Login';
import LoginAdmi from './pages/LoginAdmi';
import Products from './pages/Products';
import ProductsCreate from './pages/ProductsCreate';
import ProductsStock from './pages/ProductsStock';
import Register from './pages/Register';
import RegisterAdmi from './pages/RegisterAdmi';
import { Rome } from './pages/Rome';
import Categoria from './pages/categoria';
import { Home } from './pages/home';
import { PageAdmi } from './pages/pageAdmi';
import ProductEdit from './pages/productEdit';
const App = () => {
  const [carrito, setCarrito] = useState([]);
  

  const addToCart = (productName, productPrice) => {
    setCarrito([...carrito, { nombre: productName, precio: productPrice, cantidad: 1 }]);
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/brother" element={<Brother addToCart={addToCart} />} />
          <Route path="/rome" element={<Rome />} />
          <Route path="/products/create" element={<ProductsCreate />} />
          <Route path="/loginAdmin" element={<LoginAdmi />} />
          <Route path="/listProducts" element={<ListProducts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/registerAdmi" element={<RegisterAdmi />} />
          <Route path="/productsStock" element={<ProductsStock />} />
          <Route path="/pageAdmi" element={<PageAdmi />} />
          <Route path="/listPedidos" element={<ListPedidos />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
