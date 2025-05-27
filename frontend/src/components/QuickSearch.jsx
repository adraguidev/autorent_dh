import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './QuickSearch.css';

const QuickSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Obtener sugerencias
  useEffect(() => {
    const getSuggestions = async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const results = await api.getSearchSuggestions(query);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error getting suggestions:', error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(getSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Navegar a la página principal con parámetros de búsqueda
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  return (
    <div className="quick-search" ref={searchRef}>
      <div className="quick-search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Buscar vehículos..."
          className="quick-search-input"
        />
        <button 
          onClick={() => handleSearch()}
          className="quick-search-btn"
          disabled={!query.trim()}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Sugerencias */}
      {showSuggestions && (
        <div ref={suggestionsRef} className="quick-suggestions">
          {loading ? (
            <div className="quick-suggestion-item loading">
              <i className="fas fa-spinner fa-spin"></i>
              Buscando...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="quick-suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <i className="fas fa-search"></i>
                {suggestion}
              </div>
            ))
          ) : query.length >= 2 ? (
            <div className="quick-suggestion-item no-results">
              <i className="fas fa-info-circle"></i>
              No se encontraron sugerencias
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default QuickSearch; 