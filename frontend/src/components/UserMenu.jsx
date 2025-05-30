import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout, getUserInitials } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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

  const handleHistorialClick = () => {
    console.log('🔍 UserMenu: Historial clicked!');
    closeMenu();
    setTimeout(() => {
      console.log('🚀 UserMenu: Forcing navigation to /reservations');
      window.location.href = '/reservations';
    }, 50);
  };

  const handleAdminNavigation = (path, name) => {
    console.log(`🔍 UserMenu: ${name} clicked!`);
    closeMenu();
    setTimeout(() => {
      console.log(`🚀 UserMenu: Forcing navigation to ${path}`);
      window.location.href = path;
    }, 50);
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

          <button 
            className="user-menu-item"
            data-testid="historial-link"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔍 Button click event:', e);
              handleHistorialClick();
            }}
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 99999
            }}
          >
            <i className="fas fa-history"></i>
            <span>Mi Historial</span>
          </button>

          {user.isAdmin && (
            <>
              <button 
                className="user-menu-item"
                onClick={() => handleAdminNavigation('/administracion', 'Panel de Admin')}
              >
                <i className="fas fa-cog"></i>
                <span>Panel de Admin</span>
              </button>
              
              <button 
                className="user-menu-item"
                onClick={() => handleAdminNavigation('/admin/users', 'Gestionar Usuarios')}
              >
                <i className="fas fa-users"></i>
                <span>Gestionar Usuarios</span>
              </button>
              
              <button 
                className="user-menu-item"
                onClick={() => handleAdminNavigation('/admin/categories', 'Gestionar Categorías')}
              >
                <i className="fas fa-tags"></i>
                <span>Gestionar Categorías</span>
              </button>
              
              <button 
                className="user-menu-item"
                onClick={() => handleAdminNavigation('/admin/add-category', 'Agregar Categoría')}
              >
                <i className="fas fa-plus-circle"></i>
                <span>Agregar Categoría</span>
              </button>
              
              <button 
                className="user-menu-item"
                onClick={() => handleAdminNavigation('/administracion/productos', 'Gestionar Productos')}
              >
                <i className="fas fa-box"></i>
                <span>Gestionar Productos</span>
              </button>
              
              <button 
                className="user-menu-item"
                onClick={() => handleAdminNavigation('/admin/add-product', 'Agregar Producto')}
              >
                <i className="fas fa-plus"></i>
                <span>Agregar Producto</span>
              </button>
              
              <button 
                className="user-menu-item"
                onClick={() => handleAdminNavigation('/admin/characteristics', 'Gestionar Características')}
              >
                <i className="fas fa-list"></i>
                <span>Gestionar Características</span>
              </button>
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