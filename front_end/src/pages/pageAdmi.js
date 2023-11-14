import React from 'react';
import '../css/products.css';

export const PageAdmi = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

function Sidebar() {
  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 sidebar">
    <div className="position-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="/pageAdmi">Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Usuarios</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/products">Productos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/productsStock">Pedidos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/categoria">Categoria</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/loginAdmin">Salir</a>
        </li>
      </ul>
    </div>
  </nav>
  );
}

function Content() {
  return (
    <div className="col-md-9 col-lg-10 content">
      <h1>Inicio</h1>
      <p>Esta es la página de inicio del dashboard.</p>
    </div>
  );
}
