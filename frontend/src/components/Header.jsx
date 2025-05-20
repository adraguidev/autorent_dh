import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">AutoRent</div>
      <nav className="navbar">
        <a href="/">Inicio</a>
        <a href="/reservas">Reservas</a>
        <a href="/contacto">Contacto</a>
      </nav>
    </header>
  );
};

export default Header;
