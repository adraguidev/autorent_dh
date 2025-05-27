import React from "react";
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo-link">
          <span className="header-logo">AutoRent</span>
          <span className="slogan">Renta de autos fácil y rápida</span>
        </a>
      </div>
      <div className="header-right">
        <Link to="/register" className="header-btn">Crear cuenta</Link>
        <Link to="/login" className="header-btn header-btn--primary">Iniciar sesión</Link>
      </div>
    </header>
  );
};

export default Header;
