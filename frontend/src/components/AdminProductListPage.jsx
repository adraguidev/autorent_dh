// src/components/AdminProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../mockProducts'; // Asegúrate que la ruta sea correcta
import './AdminProductListPage.css';

const AdminProductListPage = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const products = mockProducts; // Usar los mockProducts

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobileView) {
    return (
      <div className="admin-product-list-page-container mobile-message-container">
        <p className="mobile-unavailable-message">
          La lista de productos no está disponible para dispositivos móviles.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-product-list-page-container">
      <header className="admin-product-list-header">
        <h1>Lista de Productos</h1>
        <Link to="/administracion" className="back-to-admin-link">
          ← Volver al Panel
        </Link>
      </header>
      
      {products.length > 0 ? (
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td className="actions-cell">
                    <button className="action-button edit-button">Editar</button>
                    <button className="action-button delete-button">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay productos para mostrar.</p>
      )}
    </div>
  );
};

export default AdminProductListPage;
