import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import ErrorMessage from './ErrorMessage';
import MainLayout from './MainLayout';
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
      <MainLayout
        title="Acceso Denegado"
        subtitle="Permisos insuficientes"
        icon="fas fa-exclamation-triangle"
        containerSize="medium"
      >
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-user-shield" style={{ fontSize: '4rem', color: 'var(--danger-color)' }}></i>
          </div>
          <h3>Sin permisos de administrador</h3>
          <p>No tienes permisos para agregar productos. Solo los administradores pueden realizar esta acción.</p>
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout
        title="Agregar Nuevo Producto"
        subtitle="Cargando datos del formulario..."
        icon="fas fa-plus-circle"
        containerSize="large"
      >
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando categorías y características...</span>
        </div>
      </MainLayout>
    );
  }

  const stats = [
    { number: categories.length, label: 'Categorías Disponibles' },
    { number: characteristics.length, label: 'Características' },
    { number: selectedCharacteristics.length, label: 'Seleccionadas' }
  ];

  return (
    <MainLayout
      title="Agregar Nuevo Producto"
      subtitle="Completa la información del producto para agregarlo al catálogo"
      icon="fas fa-plus-circle"
      showStats={true}
      stats={stats}
      containerSize="large"
    >
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="card" style={{ background: '#d1edff', borderColor: '#28a745', color: '#155724', marginBottom: 'var(--spacing-lg)' }}>
          <div className="card-body">
            <i className="fas fa-check-circle" style={{ color: '#28a745', marginRight: 'var(--spacing-sm)' }}></i>
            {successMessage}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-car"></i>
            Información del Producto
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="add-product-form">
            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="productName" className="form-label">Nombre del Producto: *</label>
                <input 
                  type="text" 
                  id="productName" 
                  className="form-control"
                  value={productName} 
                  onChange={(e) => setProductName(e.target.value)} 
                  placeholder="Ej: Sedán Familiar Confortable"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="productPrice" className="form-label">Precio: *</label>
                <input 
                  type="text" 
                  id="productPrice" 
                  className="form-control"
                  value={productPrice} 
                  onChange={(e) => setProductPrice(e.target.value)} 
                  placeholder="Ej: $40/día"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="productDescription" className="form-label">Descripción: *</label>
              <textarea 
                id="productDescription" 
                className="form-control"
                value={productDescription} 
                onChange={(e) => setProductDescription(e.target.value)} 
                placeholder="Describe las características principales del vehículo..."
                rows="4"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="productCategory" className="form-label">Categoría: *</label>
              <select 
                id="productCategory" 
                className="form-control"
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
              <label className="form-label">Características del Vehículo:</label>
              <div className="grid grid-4" style={{ gap: 'var(--spacing-sm)' }}>
                {characteristics.map(characteristic => (
                  <div 
                    key={characteristic.id} 
                    className={`card ${selectedCharacteristics.includes(characteristic.id) ? 'bg-primary text-white' : ''}`}
                    onClick={() => handleCharacteristicToggle(characteristic.id)}
                    style={{ cursor: 'pointer', padding: 'var(--spacing-sm)', textAlign: 'center' }}
                  >
                    <i className={characteristic.icon} style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}></i>
                    <div style={{ fontSize: 'var(--font-size-sm)' }}>{characteristic.name}</div>
                    {selectedCharacteristics.includes(characteristic.id) && (
                      <i className="fas fa-check" style={{ position: 'absolute', top: '5px', right: '5px' }}></i>
                    )}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 'var(--spacing-sm)' }}>
                Selecciona las características que incluye este vehículo. Puedes seleccionar múltiples opciones.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="productImages" className="form-label">Imágenes del Producto:</label>
              <input 
                type="file" 
                id="productImages" 
                className="form-control"
                multiple 
                accept="image/*"
                onChange={handleImageChange} 
              />
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 'var(--spacing-xs)' }}>
                Nota: Por el momento se usará una imagen placeholder. La funcionalidad de subida de imágenes se implementará próximamente.
              </p>
              {productImages.length > 0 && (
                <div className="grid grid-4" style={{ marginTop: 'var(--spacing-sm)' }}>
                  {productImages.map((image, index) => (
                    <img 
                      key={index} 
                      src={URL.createObjectURL(image)} 
                      alt={`preview ${index}`} 
                      style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-end">
              <button type="submit" className="btn btn-success btn-lg">
                <i className="fas fa-plus"></i>
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddProductPage;
