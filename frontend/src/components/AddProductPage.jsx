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
  const [productImageUrls, setProductImageUrls] = useState([]);
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

  // Funciones para manejar URLs de imágenes
  const handleImageUrlChange = (index, newUrl) => {
    setProductImageUrls(prev => 
      prev.map((url, i) => i === index ? newUrl : url)
    );
  };

  const addImageUrl = () => {
    setProductImageUrls(prev => [...prev, '']);
  };

  const removeImageUrl = (index) => {
    setProductImageUrls(prev => prev.filter((_, i) => i !== index));
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
        imageUrls: productImageUrls.filter(url => url.trim()).length > 0 
          ? productImageUrls.filter(url => url.trim())
          : ['/assets/placeholder_image.webp'], // Placeholder si no hay URLs
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
        setProductImageUrls([]);
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
              <label className="form-label">Imágenes del Producto:</label>
              <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                {productImageUrls.length > 0 ? (
                  productImageUrls.map((url, index) => (
                    <div key={index} className="flex" style={{ gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-xs)', alignItems: 'center' }}>
                      <input
                        type="url"
                        className="form-control"
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        placeholder={`URL de imagen ${index + 1}`}
                        style={{ flex: 1 }}
                      />
                      <button 
                        type="button" 
                        onClick={() => removeImageUrl(index)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: '0.3rem 0.6rem', minWidth: 'auto' }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: '0 0 var(--spacing-sm) 0' }}>
                    No hay imágenes configuradas
                  </p>
                )}
                <button 
                  type="button" 
                  onClick={addImageUrl}
                  className="btn btn-outline-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}
                >
                  <i className="fas fa-plus"></i>
                  Añadir URL de imagen
                </button>
              </div>
              
              <div className="card" style={{ background: 'var(--bg-secondary)', padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <h6 style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--text-primary)' }}>
                  <i className="fas fa-lightbulb" style={{ marginRight: 'var(--spacing-xs)', color: 'var(--warning-color)' }}></i>
                  Consejos para las URLs de imágenes:
                </h6>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  <li>Usa URLs directas a imágenes (que terminen en .jpg, .png, .webp, etc.)</li>
                  <li>Recomendado: imágenes de al menos 800x600 píxeles</li>
                  <li>Las imágenes deben ser accesibles públicamente</li>
                  <li>La primera imagen será la imagen principal del producto</li>
                </ul>
              </div>
              
              {/* Vista previa de imágenes */}
              {productImageUrls.some(url => url.trim()) ? (
                <div>
                  <label className="form-label">Vista previa:</label>
                  <div className="grid grid-4" style={{ gap: 'var(--spacing-sm)' }}>
                    {productImageUrls
                      .filter(url => url.trim())
                      .slice(0, 4)
                      .map((url, index) => (
                        <div key={index} style={{ 
                          position: 'relative', 
                          background: 'var(--bg-secondary)',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          border: '2px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '80px'
                        }}>
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '80px',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                            onLoad={(e) => {
                              e.target.style.display = 'block';
                              if (e.target.nextElementSibling) {
                                e.target.nextElementSibling.style.display = 'none';
                              }
                            }}
                          />
                          <div style={{
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '80px',
                            color: 'var(--text-secondary)',
                            fontSize: 'var(--font-size-sm)',
                            textAlign: 'center',
                            padding: 'var(--spacing-xs)'
                          }}>
                            <div>
                              <i className="fas fa-image" style={{ fontSize: '1.2rem', marginBottom: '4px', display: 'block' }}></i>
                              Error al cargar
                            </div>
                          </div>
                          {index === 0 && (
                            <div style={{
                              position: 'absolute',
                              top: '4px',
                              left: '4px',
                              background: 'var(--primary-color)',
                              color: 'white',
                              fontSize: '0.7rem',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontWeight: '600'
                            }}>
                              Principal
                            </div>
                          )}
                        </div>
                      ))}
                    {productImageUrls.filter(url => url.trim()).length > 4 && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80px',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '600'
                      }}>
                        +{productImageUrls.filter(url => url.trim()).length - 4} más
                      </div>
                    )}
                  </div>
                </div>
              ) : productImageUrls.length > 0 ? (
                <div>
                  <label className="form-label">Vista previa:</label>
                  <div style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '2px dashed var(--border-color)'
                  }}>
                    <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)', display: 'block' }}></i>
                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                      Añade URLs válidas para ver las vistas previas
                    </p>
                  </div>
                </div>
              ) : null}
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
