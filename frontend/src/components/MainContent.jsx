import React, { useState, useEffect } from 'react'; // Importar useEffect
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './MainContent.css';
import './Pagination.css'; // Crearemos este archivo para los estilos de paginación

const MainContent = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Mostrar 8 productos por página

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    // Ajustar currentPage si es necesario después de que los productos cambian (ej. por eliminación)
    const newTotalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages); // Si la página actual excede el nuevo total, ir a la última página válida
    } else if (currentPage > 1 && newTotalPages === 0) { // Si no quedan productos y no estamos en la página 1
      setCurrentPage(1); // Resetear a la página 1
    } else if (currentPage === 0 && newTotalPages > 0) { // Si currentPage es 0 por alguna razón y hay páginas
      setCurrentPage(1);
    }
    // Si no hay productos y estábamos en la página 1, currentPage sigue siendo 1, lo cual está bien.
  }, [products, productsPerPage, currentPage]);

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
