import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../mockProducts'; // Ajusta la ruta según sea necesario
import ProductCard from './ProductCard';
import './MainContent.css';
import './Pagination.css'; // Crearemos este archivo para los estilos de paginación

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Mostrar 8 productos por página

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = mockProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(mockProducts.length / productsPerPage);

  // Cambiar de página
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Generar números de página para mostrar (ej. [1, 2, 3] o más complejo si son muchas páginas)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
        <h2 className="main-content-title">Productos Destacados</h2>
        <div className="product-list">
          {currentProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button onClick={goToFirstPage} disabled={currentPage === 1} className="pagination-button first-page">
              Inicio
            </button>
            <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button prev-next">
              Anterior
            </button>
            
            {/* Números de página */} 
            {pageNumbers.map(number => (
              <button 
                key={number} 
                onClick={() => paginate(number)} 
                className={`pagination-button page-number ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}
            
            <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-button prev-next">
              Siguiente
            </button>
            {/* Podríamos añadir un botón para ir a la última página si es necesario */}
          </div>
        )}
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
