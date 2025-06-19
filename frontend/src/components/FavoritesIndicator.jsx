import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import './FavoritesIndicator.css';

const FavoritesIndicator = () => {
  const { getFavoritesCount } = useFavorites();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return null;
  }

  const favoritesCount = getFavoritesCount();

  return (
    <div className="favorites-indicator">
      <Link 
        to="/favorites"
        className="favorites-indicator-link"
        title={`${favoritesCount} producto${favoritesCount !== 1 ? 's' : ''} en favoritos`}
        aria-label={`${favoritesCount} productos en favoritos`}
      >
        <div className="heart-container">
          <i className={`fas fa-heart heart-icon ${favoritesCount > 0 ? 'heart-beating' : ''}`}></i>
        </div>
        {favoritesCount > 0 && (
          <span className="favorites-count-badge">{favoritesCount}</span>
        )}
      </Link>
    </div>
  );
};

export default FavoritesIndicator; 