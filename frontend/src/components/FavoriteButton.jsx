import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FavoriteButton.css';

const FavoriteButton = ({ productId, inline = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isProductFavorite = isFavorite(productId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Mostrar prompt elegante para usuarios no autenticados
      const shouldLogin = window.confirm(
        '¡Inicia sesión para guardar tus productos favoritos!\n\n¿Te gustaría ir a la página de inicio de sesión?'
      );
      
      if (shouldLogin) {
        navigate('/login');
      }
      return;
    }

    toggleFavorite(productId);
  };

  return (
    <div className={`favorite-button-container ${inline ? 'inline' : ''}`}>
      <button
        className={`favorite-button ${isProductFavorite ? 'favorite-active' : ''}`}
        onClick={handleClick}
        aria-label={isProductFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        title={isProductFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <i className="fas fa-heart"></i>
      </button>
    </div>
  );
};

export default FavoriteButton; 