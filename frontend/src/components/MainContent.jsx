import React from 'react';
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
    </main>
  );
};

export default MainContent;
