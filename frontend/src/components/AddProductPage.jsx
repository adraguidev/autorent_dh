import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import ErrorMessage from './ErrorMessage';
import './AddProductPage.css';

const AddProductPage = ({ handleAddProduct }) => {
  const { user } = useAuth();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
  
  // Estados para datos del backend
  const [categories, setCategories] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Cargar datos iniciales
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [categoriesData, characteristicsData] = await Promise.all([
        api.getCategories(),
        api.getCharacteristics()
      ]);
      
      setCategories(categoriesData);
      setCharacteristics(characteristicsData);
    } catch (error) {
      console.error('Error loading initial data:', error);
      setError('Error al cargar los datos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setProductImages(prevImages => [...prevImages, ...Array.from(e.target.files)]);
    }
  };

  const handleCharacteristicToggle = (characteristicId) => {
    setSelectedCharacteristics(prev => {
      if (prev.includes(characteristicId)) {
        return prev.filter(id => id !== characteristicId);
      } else {
        return [...prev, characteristicId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!productName.trim() || !productDescription.trim() || !selectedCategoryId || !productPrice.trim()) {
      setError('Todos los campos obligatorios deben ser completados.');
      return;
    }

    try {
      const productData = {
        name: productName.trim(),
        description: productDescription.trim(),
        price: productPrice.trim(),
        categoryId: parseInt(selectedCategoryId),
        imageUrls: ['/src/assets/placeholder_image.webp'], // Placeholder por ahora
        characteristicIds: selectedCharacteristics // Incluir características seleccionadas
      };

      if (handleAddProduct) {
        await handleAddProduct(productData);
        setSuccessMessage('Producto agregado exitosamente.');
        
        // Limpiar formulario
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductImages([]);
        setSelectedCategoryId('');
        setSelectedCharacteristics([]);
        
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error al agregar el producto. Por favor, intenta de nuevo.');
    }
  };

  // Verificar si el usuario actual es administrador
  if (!user?.isAdmin) {
    return (
      <div className="admin-access-denied">
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para agregar productos. Solo los administradores pueden realizar esta acción.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="add-product-page">
      <div className="admin-header">
        <h1>Agregar Nuevo Producto</h1>
        <p>Completa la información del producto para agregarlo al catálogo</p>
      </div>

      <ErrorMessage message={error} type="error" />
      {successMessage && (
        <ErrorMessage message={successMessage} type="success" />
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productName">Nombre del Producto: *</label>
              <input 
                type="text" 
                id="productName" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
                placeholder="Ej: Sedán Familiar Confortable"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="productPrice">Precio: *</label>
              <input 
                type="text" 
                id="productPrice" 
                value={productPrice} 
                onChange={(e) => setProductPrice(e.target.value)} 
                placeholder="Ej: $40/día"
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="productDescription">Descripción: *</label>
            <textarea 
              id="productDescription" 
              value={productDescription} 
              onChange={(e) => setProductDescription(e.target.value)} 
              placeholder="Describe las características principales del vehículo..."
              rows="4"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="productCategory">Categoría: *</label>
            <select 
              id="productCategory" 
              value={selectedCategoryId} 
              onChange={(e) => setSelectedCategoryId(e.target.value)} 
              required
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Características del Vehículo:</label>
            <div className="characteristics-grid">
              {characteristics.map(characteristic => (
                <div 
                  key={characteristic.id} 
                  className={`characteristic-item ${selectedCharacteristics.includes(characteristic.id) ? 'selected' : ''}`}
                  onClick={() => handleCharacteristicToggle(characteristic.id)}
                >
                  <i className={characteristic.icon}></i>
                  <span>{characteristic.name}</span>
                  {selectedCharacteristics.includes(characteristic.id) && (
                    <i className="fas fa-check check-icon"></i>
                  )}
                </div>
              ))}
            </div>
            <p className="characteristics-help">
              Selecciona las características que incluye este vehículo. Puedes seleccionar múltiples opciones.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="productImages">Imágenes del Producto:</label>
            <input 
              type="file" 
              id="productImages" 
              multiple 
              accept="image/*"
              onChange={handleImageChange} 
            />
            <p className="image-help">
              Nota: Por el momento se usará una imagen placeholder. La funcionalidad de subida de imágenes se implementará próximamente.
            </p>
            <div className="image-preview-container">
              {productImages.length > 0 && productImages.map((image, index) => (
                <img 
                  key={index} 
                  src={URL.createObjectURL(image)} 
                  alt={`preview ${index}`} 
                  className="image-preview"
                />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-product-btn">
              <i className="fas fa-plus"></i>
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
