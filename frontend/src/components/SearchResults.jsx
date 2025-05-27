import React from 'react';
import ProductCard from './ProductCard';
import './SearchResults.css';

const SearchResults = ({ 
  results = [], 
  loading = false, 
  searchParams = {}, 
  onClearSearch 
}) => {
  if (loading) {
    return (
      <div className="search-results">
        <div className="search-results-header">
          <h3>Buscando vehículos...</h3>
        </div>
        <div className="loading-container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p>Estamos buscando los mejores vehículos para ti</p>
        </div>
      </div>
    );
  }

  const hasSearchParams = Object.keys(searchParams).length > 0;
  const searchQuery = searchParams.query;
  const categoryFilter = searchParams.categoryId;
  const priceFilter = searchParams.priceRange;

  if (hasSearchParams && results.length === 0) {
    return (
      <div className="search-results">
        <div className="search-results-header">
          <h3>No se encontraron resultados</h3>
          <div className="search-summary">
            {searchQuery && (
              <span className="search-term">
                <i className="fas fa-search"></i>
                "{searchQuery}"
              </span>
            )}
            {categoryFilter && (
              <span className="search-filter">
                <i className="fas fa-tag"></i>
                Categoría seleccionada
              </span>
            )}
            {priceFilter && (
              <span className="search-filter">
                <i className="fas fa-dollar-sign"></i>
                {priceFilter}
              </span>
            )}
          </div>
        </div>
        
        <div className="no-results">
          <div className="no-results-icon">
            <i className="fas fa-search"></i>
          </div>
          <h4>No encontramos vehículos que coincidan con tu búsqueda</h4>
          <p>Intenta con diferentes términos de búsqueda o ajusta los filtros</p>
          <div className="no-results-suggestions">
            <h5>Sugerencias:</h5>
            <ul>
              <li>Verifica la ortografía de las palabras clave</li>
              <li>Usa términos más generales</li>
              <li>Prueba con diferentes categorías</li>
              <li>Ajusta el rango de precios</li>
            </ul>
          </div>
          <button onClick={onClearSearch} className="clear-search-btn">
            <i className="fas fa-times"></i>
            Limpiar búsqueda
          </button>
        </div>
      </div>
    );
  }

  if (hasSearchParams && results.length > 0) {
    return (
      <div className="search-results">
        <div className="search-results-header">
          <h3>
            {results.length} {results.length === 1 ? 'vehículo encontrado' : 'vehículos encontrados'}
          </h3>
          <div className="search-summary">
            {searchQuery && (
              <span className="search-term">
                <i className="fas fa-search"></i>
                "{searchQuery}"
              </span>
            )}
            {categoryFilter && (
              <span className="search-filter">
                <i className="fas fa-tag"></i>
                Categoría seleccionada
              </span>
            )}
            {priceFilter && (
              <span className="search-filter">
                <i className="fas fa-dollar-sign"></i>
                {priceFilter}
              </span>
            )}
            <button onClick={onClearSearch} className="clear-filters-btn">
              <i className="fas fa-times"></i>
              Limpiar filtros
            </button>
          </div>
        </div>
        
        <div className="search-results-grid">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  // Sin búsqueda activa, no mostrar nada
  return null;
};

export default SearchResults; 