// Importa el contexto correctamente
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Ajusta la ruta según tu estructura de carpetas
import brotherlogo from 'D:\\Documentos\\OCTAVO SEMESTRE\\MicafeUmes2.0\\Micafe\\front_end/src/assets/img1.png';
import logo2 from 'D:\\Documentos\\OCTAVO SEMESTRE\\MicafeUmes2.0\\Micafe\\front_end/src/assets/img2.jpg';

export const Home = () => {
  // Usa el contexto
  const { logout } = useAuth();

  return (
    <div className="container mt-5 container-with-green-background">
      <h1>Bienvenido!</h1>
      <h1>Elige la cafetería de preferencia</h1>
      <div className="buttons">
        <React.Fragment>
          <Link to="/brother" className="boton_logo">
            <img src={brotherlogo} alt="brother Logo" />
          </Link>
          <Link to="/rome" className="boton_logo">
            <img src={logo2} alt="doña rome logo" />
          </Link>
        </React.Fragment>
        <div className="separador"></div>
        <Link to="/" onClick={logout} className="productos-button">
          Salir
        </Link>
      </div>
    </div>
  );
};
