import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from './ProductCard';
import MainLayout from './MainLayout';
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
      <MainLayout
        title="Mis Favoritos"
        subtitle="Acceso requerido"
        icon="fas fa-heart"
        containerSize="medium"
        headerActions={<Link to="/" className="btn" style={{ backgroundColor: 'white', color: '#333', border: '1px solid #ddd' }}>← Volver al inicio</Link>}
      >
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-heart"></i>
          </div>
          <h3>Inicia sesión para ver tus favoritos</h3>
          <p>Debes iniciar sesión para poder guardar y ver tus productos favoritos.</p>
          <div className="flex flex-center">
            <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
            <Link to="/register" className="btn btn-outline-primary">Crear cuenta</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout
        title="Mis Favoritos"
        subtitle="Cargando productos favoritos..."
        icon="fas fa-heart"
        containerSize="large"
        headerActions={<Link to="/" className="btn" style={{ backgroundColor: 'white', color: '#333', border: '1px solid #ddd' }}>← Volver al inicio</Link>}
      >
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando favoritos...</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <div data-component="favorites">
      <MainLayout
        title="Mis Favoritos"
        subtitle={`${favoriteProducts.length} producto${favoriteProducts.length !== 1 ? 's' : ''} guardados en tu lista de favoritos`}
        icon="fas fa-heart"
        containerSize="large"
        headerActions={<Link to="/" className="btn" style={{ backgroundColor: 'white', color: '#333', border: '1px solid #ddd' }}>← Volver al inicio</Link>}
      >
      {favoriteProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="far fa-heart"></i>
          </div>
          <h3>No tienes productos favoritos</h3>
          <p>Explora nuestro catálogo y marca los productos que más te gusten haciendo clic en el corazón.</p>
          <Link to="/" className="btn btn-primary">Explorar productos</Link>
        </div>
      ) : (
        <div className="grid grid-4 favorites-compact-grid">
          {favoriteProducts.map(product => (
            <div key={product.id} className="animate-slide-up">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      </MainLayout>
    </div>
  );
};

export default FavoritesPage; 