import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Cargar favoritos cuando el usuario se autentica
  useEffect(() => {
    if (isAuthenticated() && user?.id) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user, isAuthenticated]);

  const loadFavorites = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const userFavorites = await api.getFavorites(user.id);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      // En caso de error, usar localStorage como fallback
      const localFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (localFavorites) {
        setFavorites(JSON.parse(localFavorites));
      }
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (productId) => {
    if (!isAuthenticated() || !user?.id) {
      return false;
    }

    try {
      await api.addToFavorites(user.id, productId);
      const newFavorites = [...favorites, productId];
      setFavorites(newFavorites);
      
      // Guardar en localStorage como backup
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      
      // Fallback: guardar solo en localStorage
      const newFavorites = [...favorites, productId];
      setFavorites(newFavorites);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
      return true;
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!isAuthenticated() || !user?.id) {
      return false;
    }

    try {
      await api.removeFromFavorites(user.id, productId);
      const newFavorites = favorites.filter(id => id !== productId);
      setFavorites(newFavorites);
      
      // Actualizar localStorage
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      
      // Fallback: remover solo de localStorage
      const newFavorites = favorites.filter(id => id !== productId);
      setFavorites(newFavorites);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
      return true;
    }
  };

  const toggleFavorite = async (productId) => {
    if (isFavorite(productId)) {
      return await removeFromFavorites(productId);
    } else {
      return await addToFavorites(productId);
    }
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    loadFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 