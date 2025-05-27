import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { api } from '../services/api';
import './MainContent.css';
import './Pagination.css';

const MainContent = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 8;

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, []);

  // Actualizar productos filtrados cuando cambian los productos o filtros
  useEffect(() => {
    applyFilters();
  }, [products, selectedCategories]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await api.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        selectedCategories.includes(product.category?.id || product.categoryId)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
  };

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (currentPage > 1 && newTotalPages === 0) {
      setCurrentPage(1);
    } else if (currentPage === 0 && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredProducts, productsPerPage, currentPage]);

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
        <div className="categories-header">
          <h2>Filtrar por Categorías</h2>
          {selectedCategories.length > 0 && (
            <button 
              onClick={clearAllFilters}
              className="clear-filters-btn"
            >
              <i className="fas fa-times"></i>
              Limpiar Filtros
            </button>
          )}
        </div>

        {loading ? (
          <div className="categories-loading">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Cargando categorías...</span>
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map(category => (
              <div
                key={category.id}
                className={`category-filter-item ${
                  selectedCategories.includes(category.id) ? 'selected' : ''
                }`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <div className="category-icon">
                  <i className="fas fa-car"></i>
                </div>
                <span className="category-name">{category.name}</span>
                {selectedCategories.includes(category.id) && (
                  <div className="category-check">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedCategories.length > 0 && (
          <div className="active-filters">
            <span className="active-filters-label">Filtros activos:</span>
            <div className="active-filters-list">
              {selectedCategories.map(categoryId => {
                const category = categories.find(cat => cat.id === categoryId);
                return category ? (
                  <span key={categoryId} className="active-filter-tag">
                    {category.name}
                    <button
                      onClick={() => handleCategoryToggle(categoryId)}
                      className="remove-filter-btn"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </section>

      <section className="recommendations-section">
        <div className="products-header">
          <h2 className="main-content-title">
            {selectedCategories.length > 0 ? 'Productos Filtrados' : 'Todos los Productos'}
          </h2>
          <div className="products-count">
            <span className="count-info">
              Mostrando {currentProducts.length} de {filteredProducts.length} productos
              {products.length !== filteredProducts.length && (
                <span className="total-count"> (Total: {products.length})</span>
              )}
            </span>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products-message">
            <div className="no-products-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>No se encontraron productos</h3>
            <p>No hay productos que coincidan con los filtros seleccionados.</p>
            <button onClick={clearAllFilters} className="clear-filters-btn-alt">
              Ver todos los productos
            </button>
          </div>
        ) : (
          <>
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
                <button 
                  onClick={goToFirstPage} 
                  disabled={currentPage === 1} 
                  className="pagination-button first-page"
                >
                  Inicio
                </button>
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1} 
                  className="pagination-button prev-next"
                >
                  Anterior
                </button>
                
                {pageNumbers.map(number => (
                  <button 
                    key={number} 
                    onClick={() => paginate(number)} 
                    className={`pagination-button page-number ${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages} 
                  className="pagination-button prev-next"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="admin-panel-section">
        <h2>Panel de Administración</h2>
        <Link to="/admin/add-product" className="admin-add-product-btn-link">
          <button className="admin-add-product-btn">Agregar Producto</button>
        </Link>
      </section>
    </main>
  );
};

export default MainContent;
