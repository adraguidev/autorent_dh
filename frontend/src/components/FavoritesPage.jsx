import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from './ProductCard';
import './FavoritesPage.css';

const FavoritesPage = ({ products }) => {
  const { favorites, loading } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (products && favorites.length > 0) {
      const filteredProducts = products.filter(product => 
        favorites.includes(product.id)
      );
      setFavoriteProducts(filteredProducts);
    } else {
      setFavoriteProducts([]);
    }
  }, [products, favorites]);

  if (!isAuthenticated()) {
    return (
      <div className="favorites-page">
        <div className="favorites-header">
          <h1>Mis Favoritos</h1>
          <Link to="/" className="back-link">← Volver al inicio</Link>
        </div>
        <div className="favorites-empty">
          <div className="empty-icon">
            <i className="fas fa-heart"></i>
          </div>
          <h2>Inicia sesión para ver tus favoritos</h2>
          <p>Debes iniciar sesión para poder guardar y ver tus productos favoritos.</p>
          <div className="empty-actions">
            <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
            <Link to="/register" className="btn btn-secondary">Crear cuenta</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="favorites-header">
          <h1>Mis Favoritos</h1>
          <Link to="/" className="back-link">← Volver al inicio</Link>
        </div>
        <div className="favorites-loading">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando favoritos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Mis Favoritos</h1>
        <Link to="/" className="back-link">← Volver al inicio</Link>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="favorites-empty">
          <div className="empty-icon">
            <i className="far fa-heart"></i>
          </div>
          <h2>No tienes productos favoritos</h2>
          <p>Explora nuestro catálogo y marca los productos que más te gusten haciendo clic en el corazón.</p>
          <div className="empty-actions">
            <Link to="/" className="btn btn-primary">Explorar productos</Link>
          </div>
        </div>
      ) : (
        <div className="favorites-content">
          <div className="favorites-summary">
            <p>
              {favoriteProducts.length} producto{favoriteProducts.length !== 1 ? 's' : ''} en favoritos
            </p>
          </div>
          
          <div className="favorites-grid">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 