import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';
import FavoritesIndicator from './FavoritesIndicator';
import "./Header.css";

const Header = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo-link">
          <span className="header-logo">AutoRent</span>
          <span className="slogan">Renta de autos fácil y rápida</span>
        </a>
      </div>
      <div className="header-right">
        {loading ? (
          <div className="header-loading">Cargando...</div>
        ) : isAuthenticated() ? (
          <>
            <FavoritesIndicator />
            <UserMenu />
          </>
        ) : (
          <>
            <Link to="/register" className="header-btn">Crear cuenta</Link>
            <Link to="/login" className="header-btn header-btn--primary">Iniciar sesión</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
