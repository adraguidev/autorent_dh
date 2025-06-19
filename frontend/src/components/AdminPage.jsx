// src/components/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from './MainLayout';
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
      <MainLayout
        title="Panel de Administración"
        subtitle="Acceso restringido"
        icon="fas fa-mobile-alt"
        containerSize="medium"
      >
        <div className="card text-center">
          <div className="card-body">
            <i className="fas fa-mobile-alt" style={{ fontSize: '4rem', color: 'var(--warning-color)', marginBottom: 'var(--spacing-lg)' }}></i>
            <h3>Dispositivo no compatible</h3>
            <p>El panel de administración no está disponible para dispositivos móviles. Por favor, accede desde una computadora de escritorio o laptop.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const stats = [
    { number: '15', label: 'Productos Activos' },
    { number: '15', label: 'Categorías' },
    { number: '--', label: 'Usuarios Registrados' }
  ];

  return (
    <MainLayout
      title="Panel de Administración"
      subtitle="Gestiona todos los aspectos de tu aplicación de alquiler de vehículos"
      icon="fas fa-cogs"
      showStats={true}
      stats={stats}
      containerSize="large"
    >
      <div className="grid grid-2">
        {/* Menú de navegación */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-list-ul"></i>
              Menú de Administración
            </h2>
          </div>
          <div className="card-body">
            <div className="grid">
              <Link to="/admin/add-product" className="btn btn-primary">
                <i className="fas fa-plus-circle"></i>
                Agregar Nuevo Producto
              </Link>
              <Link to="/administracion/productos" className="btn btn-outline-primary">
                <i className="fas fa-list"></i>
                Lista de Productos
              </Link>
              <Link to="/admin/categories" className="btn btn-outline-primary">
                <i className="fas fa-tags"></i>
                Gestionar Categorías
              </Link>
              <Link to="/admin/add-category" className="btn btn-outline-primary">
                <i className="fas fa-plus"></i>
                Agregar Categoría
              </Link>
              <Link to="/admin/characteristics" className="btn btn-outline-primary">
                <i className="fas fa-cogs"></i>
                Gestionar Características
              </Link>
              <Link to="/admin/users" className="btn btn-outline-primary">
                <i className="fas fa-users"></i>
                Gestionar Usuarios
              </Link>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-bolt"></i>
              Acciones Rápidas
            </h2>
          </div>
          <div className="card-body">
            <p className="mb-3">Accede rápidamente a las funciones más utilizadas del panel de administración.</p>
            <div className="grid grid-3">
              <Link to="/admin/add-product" className="btn btn-success btn-lg">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
              </Link>
              <Link to="/admin/categories" className="btn btn-outline">
                <i className="fas fa-tags"></i>
                Gestionar Categorías
              </Link>
              <Link to="/administracion/productos" className="btn btn-outline">
                <i className="fas fa-list"></i>
                Ver Productos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="card mt-4">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-info-circle"></i>
            Información del Sistema
          </h2>
        </div>
        <div className="card-body">
          <div className="grid grid-3">
            <div className="text-center">
              <i className="fas fa-car" style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: 'var(--spacing-sm)' }}></i>
              <h4>Productos</h4>
              <p>Gestiona tu flota de vehículos, agregar nuevos productos y editar los existentes.</p>
            </div>
            <div className="text-center">
              <i className="fas fa-users" style={{ fontSize: '2rem', color: 'var(--accent-color)', marginBottom: 'var(--spacing-sm)' }}></i>
              <h4>Usuarios</h4>
              <p>Administra los usuarios registrados en tu plataforma de alquiler.</p>
            </div>
            <div className="text-center">
              <i className="fas fa-chart-line" style={{ fontSize: '2rem', color: 'var(--success-color)', marginBottom: 'var(--spacing-sm)' }}></i>
              <h4>Reportes</h4>
              <p>Próximamente: análisis detallados y reportes de tu negocio.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
