// src/components/AdminProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { mockProducts } from '../mockProducts'; // Ya no se importa aquí, se recibe por props
import { mockCategories } from '../mockCategories'; // Importar categorías
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
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{mockCategories.find(cat => cat.id === product.categoryId)?.name || 'Sin categoría'}</td>
                  <td className="actions-cell">
                    <Link to={`/admin/edit-product/${product.id}`} className="action-button edit-button">Editar</Link>
                    <button className="action-button delete-button" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
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
