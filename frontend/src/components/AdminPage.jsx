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
              Agregar Nuevo Producto
            </Link>
          </li>
          {/* Aquí se podrán añadir más enlaces a futuras funciones de administración */}
          {/* <li className="admin-menu-item">
            <Link to="/administracion/gestionar-productos" className="admin-menu-link">
              Gestionar Productos
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/administracion/ver-reservas" className="admin-menu-link">
              Ver Reservas
            </Link>
          </li> */}
        </ul>
      </nav>
      <main className="admin-content-area">
        {/* Aquí se podría renderizar contenido específico de la sub-ruta de admin si se implementara un layout más complejo */}
        <p>Bienvenido al panel de administración. Seleccione una opción del menú.</p>
      </main>
    </div>
  );
};

export default AdminPage;
