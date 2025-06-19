// src/components/AdminProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { mockProducts } from '../mockProducts'; // Ya no se importa aquí, se recibe por props
import { mockCategories } from '../mockCategories'; // Importar categorías
import MainLayout from './MainLayout';
import './AdminProductListPage.css';

const AdminProductListPage = ({ products, handleDeleteProduct }) => { // Recibir products y handleDeleteProduct como props
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  // const products = mockProducts; // Se elimina la asignación local, se usan las props

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobileView) {
    return (
      <MainLayout
        title="Lista de Productos"
        subtitle="Acceso restringido"
        icon="fas fa-mobile-alt"
        containerSize="medium"
      >
        <div className="card text-center">
          <div className="card-body">
            <i className="fas fa-mobile-alt" style={{ fontSize: '4rem', color: 'var(--warning-color)', marginBottom: 'var(--spacing-lg)' }}></i>
            <h3>Dispositivo no compatible</h3>
            <p>La lista de productos no está disponible para dispositivos móviles. Por favor, accede desde una computadora de escritorio o laptop.</p>
            <Link to="/administracion" className="btn btn-primary">← Volver al Panel</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const stats = [
    { number: products.length, label: 'Total Productos' },
    { number: products.filter(p => p.category || mockCategories.find(cat => cat.id === p.categoryId)).length, label: 'Con Categoría' },
    { number: products.filter(p => p.price && p.price !== '$TBD/día').length, label: 'Con Precio Definido' }
  ];

  return (
    <MainLayout
      title="Lista de Productos"
      subtitle="Gestiona y supervisa todos los productos de tu catálogo"
      icon="fas fa-list"
      showStats={true}
      stats={stats}
      containerSize="large"
      headerActions={<Link to="/administracion" className="btn btn-outline-primary">← Volver al Panel</Link>}
    >
      {products.length > 0 ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-table"></i>
              Tabla de Productos
            </h2>
          </div>
          <div className="card-body p-0">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'var(--bg-primary)' }}>
                  <tr>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>ID</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Nombre</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Categoría</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 'var(--spacing-md)', fontWeight: '500', color: 'var(--text-secondary)' }}>{product.id}</td>
                      <td style={{ padding: 'var(--spacing-md)', fontWeight: '600', color: 'var(--text-primary)' }}>{product.name}</td>
                      <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                        {product.category?.name || mockCategories.find(cat => cat.id === product.categoryId)?.name || 'Sin categoría'}
                      </td>
                      <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                        <div className="flex flex-center" style={{ gap: 'var(--spacing-xs)' }}>
                          <Link to={`/admin/edit-product/${product.id}`} className="btn btn-primary btn-sm">
                            <i className="fas fa-edit"></i>
                            Editar
                          </Link>
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <i className="fas fa-trash"></i>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-box-open"></i>
          </div>
          <h3>No hay productos registrados</h3>
          <p>No tienes productos en tu catálogo. Agrega el primer producto para comenzar.</p>
          <Link to="/admin/add-product" className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Agregar Primer Producto
          </Link>
        </div>
      )}
    </MainLayout>
  );
};

export default AdminProductListPage;
