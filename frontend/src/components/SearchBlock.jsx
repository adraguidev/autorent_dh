import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import './SearchBlock.css';

const SearchBlock = ({ onSearch, onClear, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const categoryRef = useRef(null);
  const priceRef = useRef(null);

  const priceRanges = [
    { value: '', label: 'Cualquier precio' },
    { value: '0-50', label: 'Hasta $50/día' },
    { value: '50-100', label: '$50 - $100/día' },
    { value: '100-200', label: '$100 - $200/día' },
    { value: '200+', label: 'Más de $200/día' }
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setShowPriceDropdown(false);
      }
      
      // Solo resetear activeField si el clic fue fuera de todos los campos
      if (!suggestionsRef.current?.contains(event.target) &&
          !categoryRef.current?.contains(event.target) &&
          !priceRef.current?.contains(event.target)) {
        setActiveField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await api.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const suggestions = await api.getSearchSuggestions(query);
      setSuggestions(suggestions || []);
      setShowSuggestions(suggestions && suggestions.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSearchQueryChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    const timeoutId = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setActiveField(null);
    searchInputRef.current?.blur();
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowCategoryDropdown(false);
    setActiveField(null);
  };

  const handlePriceSelect = (priceValue) => {
    setPriceRange(priceValue);
    setShowPriceDropdown(false);
    setActiveField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const searchParams = {
      query: searchQuery.trim(),
      categoryId: selectedCategory || null,
      priceRange: priceRange || null,
      startDate: startDate || null,
      endDate: endDate || null
    };

    onSearch(searchParams);
    setActiveField(null);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange('');
    setStartDate('');
    setEndDate('');
    setSuggestions([]);
    setShowSuggestions(false);
    setShowCategoryDropdown(false);
    setShowPriceDropdown(false);
    setActiveField(null);
    onClear();
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return '';
    const category = categories.find(cat => cat.id === parseInt(selectedCategory));
    return category ? category.name : '';
  };

  const getSelectedPriceLabel = () => {
    if (!priceRange) return '';
    const price = priceRanges.find(p => p.value === priceRange);
    return price ? price.label : '';
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
    
    // Cerrar otros dropdowns
    if (fieldName !== 'search') setShowSuggestions(false);
    if (fieldName !== 'category') setShowCategoryDropdown(false);
    if (fieldName !== 'price') setShowPriceDropdown(false);
    
    // Abrir el dropdown correspondiente
    if (fieldName === 'category') {
      setShowCategoryDropdown(true);
    } else if (fieldName === 'price') {
      setShowPriceDropdown(true);
    }
  };

  return (
    <div className="search-block-airbnb">
      <div className="search-container">
        <div className="search-header">
          <h1>Encuentra tu vehículo perfecto</h1>
          <p>Descubre la libertad de viajar con nuestros vehículos de alquiler</p>
        </div>

        <form className="search-bar" onSubmit={handleSubmit}>
          <div className="search-bar-inner">
            
            {/* Campo de búsqueda */}
            <div 
              className={`search-field-airbnb ${activeField === 'search' ? 'active' : ''}`}
              ref={suggestionsRef}
              onClick={() => handleFieldClick('search')}
            >
              <div className="field-label">¿Qué buscas?</div>
              <input
                ref={searchInputRef}
                type="text"
                className="field-input"
                placeholder="Buscar vehículos..."
                value={searchQuery}
                onChange={handleSearchQueryChange}
                onFocus={() => {
                  handleFieldClick('search');
                  if (searchQuery.length >= 2) setShowSuggestions(true);
                }}
              />
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="airbnb-dropdown">
                  {loadingSuggestions ? (
                    <div className="dropdown-item">
                      <i className="fas fa-spinner fa-spin"></i>
                      Buscando...
                    </div>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <i className="fas fa-search"></i>
                        {suggestion}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="field-separator"></div>

            {/* Selector de categoría */}
            <div 
              className={`search-field-airbnb ${activeField === 'category' ? 'active' : ''}`}
              ref={categoryRef}
              onClick={() => handleFieldClick('category')}
            >
              <div className="field-label">Categoría</div>
              <div className="field-input">
                {getSelectedCategoryName() || 'Cualquier categoría'}
              </div>
              
              {showCategoryDropdown && (
                <div className="airbnb-dropdown">
                  <div 
                    className={`dropdown-item ${!selectedCategory ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect('')}
                  >
                    <i className="fas fa-th-large"></i>
                    Cualquier categoría
                  </div>
                  {categories.map(category => (
                    <div
                      key={category.id}
                      className={`dropdown-item ${selectedCategory === category.id.toString() ? 'selected' : ''}`}
                      onClick={() => handleCategorySelect(category.id.toString())}
                    >
                      <i className="fas fa-car"></i>
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="field-separator"></div>

            {/* Fechas */}
            <div 
              className={`search-field-airbnb date-field ${activeField === 'dates' ? 'active' : ''}`}
              onClick={() => handleFieldClick('dates')}
            >
              <div className="field-label">Fechas</div>
              <div className="date-inputs-airbnb">
                <input
                  type="date"
                  className="date-input-airbnb"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={getTodayDate()}
                  placeholder="Inicio"
                />
                <span className="date-separator-airbnb">→</span>
                <input
                  type="date"
                  className="date-input-airbnb"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || getTodayDate()}
                  placeholder="Fin"
                />
              </div>
              {!startDate && !endDate && (
                <div className="field-placeholder">Agregar fechas</div>
              )}
            </div>

            <div className="field-separator"></div>

            {/* Precio */}
            <div 
              className={`search-field-airbnb ${activeField === 'price' ? 'active' : ''}`}
              ref={priceRef}
              onClick={() => handleFieldClick('price')}
            >
              <div className="field-label">Precio</div>
              <div className="field-input">
                {getSelectedPriceLabel() || 'Cualquier precio'}
              </div>
              
              {showPriceDropdown && (
                <div className="airbnb-dropdown">
                  {priceRanges.map(price => (
                    <div
                      key={price.value}
                      className={`dropdown-item ${priceRange === price.value ? 'selected' : ''}`}
                      onClick={() => handlePriceSelect(price.value)}
                    >
                      <i className="fas fa-dollar-sign"></i>
                      {price.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botón de búsqueda */}
            <button
              type="submit"
              className="search-button-airbnb"
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-search"></i>
              )}
            </button>
          </div>

          {/* Botón de limpiar filtros */}
          {(searchQuery || selectedCategory || priceRange || startDate || endDate) && (
            <button
              type="button"
              className="clear-filters-btn"
              onClick={handleClear}
              disabled={isLoading}
            >
              <i className="fas fa-times"></i>
              Limpiar filtros
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBlock; 