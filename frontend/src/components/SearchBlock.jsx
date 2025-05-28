import React, { useState, useEffect, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { api } from '../services/api';
import './SearchBlock.css';

// Registrar la localización en español
registerLocale('es', es);

const SearchBlock = ({ onSearch, onClear, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  const datePickerRef = useRef(null);

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
      // Verificar si el click es en cualquier parte del DatePicker (incluyendo el calendario)
      const datePickerElement = document.querySelector('.date-picker-dropdown');
      const reactDatePickerElement = document.querySelector('.react-datepicker');
      const autorentDatePickerElement = document.querySelector('.autorent-datepicker');
      const datePickerWrapperElement = document.querySelector('.datepicker-wrapper');
      
      const isClickInDatePicker = (datePickerElement && datePickerElement.contains(event.target)) ||
                                  (reactDatePickerElement && reactDatePickerElement.contains(event.target)) ||
                                  (autorentDatePickerElement && autorentDatePickerElement.contains(event.target)) ||
                                  (datePickerWrapperElement && datePickerWrapperElement.contains(event.target)) ||
                                  event.target.closest('.react-datepicker') ||
                                  event.target.closest('.date-picker-dropdown');
      
      const isOutsideCategory = categoryRef.current && !categoryRef.current.contains(event.target);
      const isOutsidePrice = priceRef.current && !priceRef.current.contains(event.target);
      const isOutsideDates = datePickerRef.current && !datePickerRef.current.contains(event.target);
      const isOutsideSearch = suggestionsRef.current && !suggestionsRef.current.contains(event.target);
      
      if (isOutsideCategory && showCategoryDropdown) {
        setShowCategoryDropdown(false);
        setActiveField(null);
      }
      
      if (isOutsidePrice && showPriceDropdown) {
        setShowPriceDropdown(false);
        setActiveField(null);
      }
      
      // Solo cerrar el DatePicker si el click es realmente fuera de TODO el componente DatePicker
      if (isOutsideDates && activeField === 'dates' && !isClickInDatePicker) {
        setActiveField(null);
      }

      if (isOutsideSearch && showSuggestions) {
        setShowSuggestions(false);
        setActiveField(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeField, showCategoryDropdown, showPriceDropdown, showSuggestions]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await api.getCategories();
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
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
    
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    
    window.searchTimeout = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleFieldClick = (fieldName) => {
    if (fieldName === 'search') {
      setActiveField('search');
      setShowCategoryDropdown(false);
      setShowPriceDropdown(false);
      if (searchQuery.length >= 2) {
        setShowSuggestions(true);
      }
    } else if (fieldName === 'category') {
      if (activeField === 'category') {
        setShowCategoryDropdown(false);
        setActiveField(null);
      } else {
        setShowCategoryDropdown(true);
        setShowPriceDropdown(false);
        setShowSuggestions(false);
        setActiveField('category');
      }
    } else if (fieldName === 'price') {
      if (activeField === 'price') {
        setShowPriceDropdown(false);
        setActiveField(null);
      } else {
        setShowPriceDropdown(true);
        setShowCategoryDropdown(false);
        setShowSuggestions(false);
        setActiveField('price');
      }
    } else if (fieldName === 'dates') {
      if (activeField === 'dates') {
        setActiveField(null);
      } else {
        setActiveField('dates');
        setShowCategoryDropdown(false);
        setShowPriceDropdown(false);
        setShowSuggestions(false);
      }
    }
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

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    // Solo cerrar automáticamente cuando ambas fechas estén seleccionadas
    // Y dar tiempo suficiente para que el usuario vea la selección
    if (start && end) {
      setTimeout(() => {
        setActiveField(null);
      }, 800); // Aumentar el delay para mejor UX
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const searchParams = {
      query: searchQuery.trim(),
      categoryId: selectedCategory || null,
      priceRange: priceRange || null,
      startDate: startDate ? startDate.toISOString().split('T')[0] : null,
      endDate: endDate ? endDate.toISOString().split('T')[0] : null
    };

    onSearch(searchParams);
    setActiveField(null);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange('');
    setStartDate(null);
    setEndDate(null);
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

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit'
    });
  };

  const formatDisplayDates = () => {
    if (!startDate && !endDate) return 'Agregar fechas';
    if (startDate && !endDate) return `${formatDate(startDate)} - Selecciona fecha de salida`;
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return 'Agregar fechas';
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
              onClick={(e) => {
                e.stopPropagation();
                handleFieldClick('search');
              }}
            >
              <div className="field-label">¿Qué buscas?</div>
              <input
                ref={searchInputRef}
                type="text"
                className="field-input"
                placeholder="Buscar vehículos..."
                value={searchQuery}
                onChange={handleSearchQueryChange}
                onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSuggestionClick(suggestion);
                        }}
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
              onClick={(e) => {
                e.stopPropagation();
                handleFieldClick('category');
              }}
            >
              <div className="field-label">Categoría</div>
              <div className="field-input">
                {getSelectedCategoryName() || 'Cualquier categoría'}
              </div>
              
              {showCategoryDropdown && (
                <div className="airbnb-dropdown">
                  <div 
                    className={`dropdown-item ${!selectedCategory ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategorySelect('');
                    }}
                  >
                    <i className="fas fa-th-large"></i>
                    Cualquier categoría
                  </div>
                  {categories.map(category => (
                    <div
                      key={category.id}
                      className={`dropdown-item ${selectedCategory === category.id.toString() ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect(category.id.toString());
                      }}
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
              ref={datePickerRef}
              onClick={(e) => {
                e.stopPropagation();
                handleFieldClick('dates');
              }}
            >
              <div className="field-label">Fechas</div>
              <div className="date-display">
                {formatDisplayDates()}
              </div>
              
              {activeField === 'dates' && (
                <div 
                  className="date-picker-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="date-picker-header">
                    <h3>
                      {!startDate ? 'Selecciona las fechas de tu viaje' : 
                       !endDate ? 'Ahora selecciona la fecha de salida' : 
                       'Fechas seleccionadas'}
                    </h3>
                    <p>
                      {!startDate ? 'Elige la fecha de inicio y fin de tu alquiler' :
                       !endDate ? 'Haz click en la fecha de fin de tu alquiler' :
                       'Puedes cambiar las fechas si lo deseas'}
                    </p>
                  </div>
                  
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange={true}
                    inline={true}
                    minDate={new Date()}
                    monthsShown={window.innerWidth > 768 ? 2 : 1}
                    showDisabledMonthNavigation
                    locale="es"
                    calendarClassName="custom-calendar autorent-datepicker"
                    wrapperClassName="datepicker-wrapper"
                    dayClassName={(date) => {
                      if (!startDate || !endDate) return '';
                      if (date >= startDate && date <= endDate) {
                        if (date.getTime() === startDate.getTime()) return 'range-start';
                        if (date.getTime() === endDate.getTime()) return 'range-end';
                        return 'in-range';
                      }
                      return '';
                    }}
                  />
                  
                  <div className="date-picker-footer">
                    <div className="date-info">
                      {startDate && endDate && (
                        <span className="nights-count">
                          {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} días seleccionados
                        </span>
                      )}
                    </div>
                    <div className="date-actions">
                      <button 
                        type="button"
                        className="date-clear-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setStartDate(null);
                          setEndDate(null);
                        }}
                      >
                        Limpiar
                      </button>
                      <button 
                        type="button"
                        className="date-apply-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveField(null);
                        }}
                        disabled={!startDate || !endDate}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="field-separator"></div>

            {/* Precio */}
            <div 
              className={`search-field-airbnb ${activeField === 'price' ? 'active' : ''}`}
              ref={priceRef}
              onClick={(e) => {
                e.stopPropagation();
                handleFieldClick('price');
              }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePriceSelect(price.value);
                      }}
                    >
                      <i className="fas fa-dollar-sign"></i>
                      {price.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contenedor de botones */}
            <div className="search-buttons-container">
              {/* Botón de limpiar como X */}
              <button
                type="button"
                className={`clear-search-btn ${(searchQuery || selectedCategory || priceRange || startDate || endDate) ? 'visible' : ''}`}
                onClick={handleClear}
                disabled={isLoading}
                title="Limpiar filtros"
              >
                <i className="fas fa-times"></i>
              </button>

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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBlock; 