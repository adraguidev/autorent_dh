import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import './MainContent.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <section className="search-section">
        <h2>Buscador</h2>
        {/* Contenido del buscador aquí */}
      </section>
      <section className="categories-section">
        <h2>Categorías</h2>
        {/* Contenido de categorías aquí */}
      </section>
      <section className="recommendations-section">
        <h2>Recomendaciones</h2>
        {/* Contenido de recomendaciones aquí */}
      </section>

      <section className="admin-panel-section">
        <h2>Panel de Administración</h2>
        <Link to="/admin/add-product" className="admin-add-product-btn-link">
          <button className="admin-add-product-btn">Agregar Producto</button>
        </Link>
        {/* Más opciones del panel de admin aquí */}
      </section>
    </main>
  );
};

export default MainContent;
