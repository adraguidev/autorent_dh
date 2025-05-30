import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout, getUserInitials } = useAuth();
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

  const closeMenu = () => {
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <button 
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú de usuario"
      >
        <div className="user-avatar">
          {getUserInitials()}
        </div>
        <span className="user-name">{user.firstName}</span>
        <i className={`fas fa-chevron-down ${isOpen ? 'rotated' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-avatar-large">
              {getUserInitials()}
            </div>
            <div className="user-info">
              <div className="user-menu-name">{user.firstName} {user.lastName}</div>
              <div className="user-menu-email">{user.email}</div>
              {user.isAdmin && (
                <div className="user-menu-role">Administrador</div>
              )}
            </div>
          </div>

          <hr className="user-menu-divider" />

          <Link 
            to="/reservations" 
            className="user-menu-item"
            onClick={closeMenu}
          >
            <i className="fas fa-history"></i>
            <span>Mi Historial</span>
          </Link>

          {user.isAdmin && (
            <>
              <Link 
                to="/administracion" 
                className="user-menu-item"
                onClick={closeMenu}
              >
                <i className="fas fa-cog"></i>
                <span>Panel de Admin</span>
              </Link>
              
              <Link 
                to="/admin/users" 
                className="user-menu-item"
                onClick={closeMenu}
              >
                <i className="fas fa-users"></i>
                <span>Gestionar Usuarios</span>
              </Link>
              
              <Link 
                to="/admin/categories" 
                className="user-menu-item"
                onClick={closeMenu}
              >
                <i className="fas fa-tags"></i>
                <span>Gestionar Categorías</span>
              </Link>
              
              <Link 
                to="/admin/add-category" 
                className="user-menu-item"
                onClick={closeMenu}
              >
                <i className="fas fa-plus-circle"></i>
                <span>Agregar Categoría</span>
              </Link>
              
              <Link 
                to="/administracion/productos" 
                className="user-menu-item"
                onClick={closeMenu}
              >
                <i className="fas fa-box"></i>
                <span>Gestionar Productos</span>
              </Link>
              
              <Link 
                to="/admin/add-product" 
                className="user-menu-item"
                onClick={closeMenu}
              >
                <i className="fas fa-plus"></i>
                <span>Agregar Producto</span>
              </Link>
              
              <Link 
                to="/admin/characteristics" 
                className="user-menu-item"
                onClick={closeMenu}
              >
                <i className="fas fa-list"></i>
                <span>Gestionar Características</span>
              </Link>
            </>
          )}

          <hr className="user-menu-divider" />

          <button 
            className="user-menu-item logout-btn"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 