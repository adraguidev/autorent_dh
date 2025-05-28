// src/components/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    // Limpiar el event listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobileView) {
    return (
      <div className="admin-page-container mobile-message-container">
        <p className="mobile-unavailable-message">
          El panel de administración no está disponible para dispositivos móviles.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <h1>Panel de Administración</h1>
      </header>
      <nav className="admin-menu">
        <ul className="admin-menu-list">
          <li className="admin-menu-item">
            <Link to="/admin/add-product" className="admin-menu-link">
              <i className="fas fa-plus-circle"></i>
              Agregar Nuevo Producto
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/administracion/productos" className="admin-menu-link">
              <i className="fas fa-list"></i>
              Lista de Productos
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/admin/categories" className="admin-menu-link">
              <i className="fas fa-tags"></i>
              Gestionar Categorías
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/admin/add-category" className="admin-menu-link">
              <i className="fas fa-plus"></i>
              Agregar Categoría
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/admin/characteristics" className="admin-menu-link">
              <i className="fas fa-cogs"></i>
              Gestionar Características
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/admin/users" className="admin-menu-link">
              <i className="fas fa-users"></i>
              Gestionar Usuarios
            </Link>
          </li>
          {/* Aquí se podrán añadir más enlaces a futuras funciones de administración */}
          {/* <li className="admin-menu-item">
            <Link to="/administracion/ver-reservas" className="admin-menu-link">
              <i className="fas fa-calendar-check"></i>
              Ver Reservas
            </Link>
          </li> */}
        </ul>
      </nav>
      <main className="admin-content-area">
        <div className="admin-welcome">
          <h2>Bienvenido al Panel de Administración</h2>
          <p>Desde aquí puedes gestionar todos los aspectos de tu aplicación de alquiler de vehículos.</p>
          
          <div className="admin-stats">
            <div className="stat-card">
              <i className="fas fa-car"></i>
              <div className="stat-info">
                <span className="stat-number">15</span>
                <span className="stat-label">Productos Activos</span>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-tags"></i>
              <div className="stat-info">
                <span className="stat-number">15</span>
                <span className="stat-label">Categorías</span>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-users"></i>
              <div className="stat-info">
                <span className="stat-number">--</span>
                <span className="stat-label">Usuarios Registrados</span>
              </div>
            </div>
          </div>
          
          <div className="quick-actions">
            <h3>Acciones Rápidas</h3>
            <div className="quick-actions-grid">
              <Link to="/admin/add-product" className="quick-action-btn primary">
                <i className="fas fa-plus-circle"></i>
                <span>Nuevo Producto</span>
              </Link>
              <Link to="/admin/categories" className="quick-action-btn secondary">
                <i className="fas fa-tags"></i>
                <span>Gestionar Categorías</span>
              </Link>
              <Link to="/administracion/productos" className="quick-action-btn secondary">
                <i className="fas fa-list"></i>
                <span>Ver Productos</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
