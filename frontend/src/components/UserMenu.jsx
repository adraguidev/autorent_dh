import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!user) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <div className="user-info" onClick={toggleMenu}>
        <div className="user-avatar">
          {(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}
        </div>
        <span className="user-name">{user.firstName} {user.lastName}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'dropdown-arrow--open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="currentColor"
        >
          <path d="M3 5l3 3 3-3z"/>
        </svg>
      </div>
      
      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-menu-avatar">
              {(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}
            </div>
            <div className="user-menu-info">
              <div className="user-menu-name">{user.firstName} {user.lastName}</div>
              <div className="user-menu-email">{user.email}</div>
            </div>
          </div>
          <hr className="user-menu-divider" />
          
          {user.isAdmin && (
            <>
              <Link to="/admin/users" className="user-menu-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
                Gestión de Usuarios
              </Link>
              <Link to="/admin/add-product" className="user-menu-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Agregar Producto
              </Link>
              <Link to="/administracion/productos" className="user-menu-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                </svg>
                Gestión de Productos
              </Link>
              <Link to="/admin/characteristics" className="user-menu-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                </svg>
                Administrar Características
              </Link>
            </>
          )}
          
          <button className="user-menu-item" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 13h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1H4V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1z"/>
              <path d="M2 8a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6A.5.5 0 0 0 2 8z"/>
              <path d="M6.354 4.646a.5.5 0 0 0-.708.708L7.293 7H2.5a.5.5 0 0 0 0 1h4.793l-1.647 1.646a.5.5 0 0 0 .708.708l2.5-2.5a.5.5 0 0 0 0-.708l-2.5-2.5z"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 