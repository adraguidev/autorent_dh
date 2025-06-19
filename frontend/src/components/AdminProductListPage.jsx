// src/components/AdminProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { mockProducts } from '../mockProducts'; // Ya no se importa aquí, se recibe por props
import { mockCategories } from '../mockCategories'; // Importar categorías
import { api } from '../services/api';
import NotificationService from '../services/notificationService';
import MainLayout from './MainLayout';
import './AdminProductListPage.css';

const AdminProductListPage = ({ products, handleDeleteProduct, handleEditProduct }) => { // Recibir products y handleDeleteProduct como props
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  // const products = mockProducts; // Se elimina la asignación local, se usan las props

  // Estados para edición de productos
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    imageUrls: [],
    characteristicIds: []
  });
  const [editLoading, setEditLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'images', 'characteristics'

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cargar categorías cuando se abre el modal
  useEffect(() => {
    if (showEditModal) {
      loadCategories();
    }
  }, [showEditModal]);

  const loadCategories = async () => {
    try {
      const [categoriesData, characteristicsData] = await Promise.all([
        api.getCategories(),
        api.getCharacteristics()
      ]);
      setCategories(categoriesData);
      setCharacteristics(characteristicsData);
    } catch (error) {
      console.error('Error loading categories and characteristics:', error);
      // Usar mock categories como fallback
      setCategories(mockCategories);
      setCharacteristics([]);
    }
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price || '',
      categoryId: product.category?.id || product.categoryId || '',
      imageUrls: product.imageUrls || [],
      characteristicIds: product.characteristics?.map(char => char.id) || []
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editFormData.name.trim() || !editFormData.description.trim() || !editFormData.categoryId) {
      NotificationService.error('Error de validación', 'El nombre, descripción y categoría son obligatorios.');
      return;
    }

    setEditLoading(true);
    try {
      const updatedProductData = {
        name: editFormData.name.trim(),
        description: editFormData.description.trim(),
        price: editFormData.price.trim(),
        categoryId: parseInt(editFormData.categoryId),
        imageUrls: editFormData.imageUrls.filter(url => url.trim()),
        characteristicIds: editFormData.characteristicIds
      };

      const updatedProduct = await api.updateProduct(productToEdit.id, updatedProductData);
      
      // Actualizar la lista de productos usando la función del padre
      if (handleEditProduct) {
        handleEditProduct(productToEdit.id, updatedProduct);
      }
      
      NotificationService.toast.success(`Producto "${editFormData.name}" actualizado exitosamente.`);
      cancelEdit();
    } catch (error) {
      console.error('Error updating product:', error);
      NotificationService.error('Error al actualizar el producto', 'Por favor, verifica los datos e intenta de nuevo.');
    } finally {
      setEditLoading(false);
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setProductToEdit(null);
    setActiveTab('basic');
    setEditFormData({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      imageUrls: [],
      characteristicIds: []
    });
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Funciones para manejar imágenes
  const handleImageUrlChange = (index, newUrl) => {
    setEditFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.map((url, i) => i === index ? newUrl : url)
    }));
  };

  const addImageUrl = () => {
    setEditFormData(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, '']
    }));
  };

  const removeImageUrl = (index) => {
    setEditFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  // Función para manejar características
  const handleCharacteristicToggle = (characteristicId) => {
    setEditFormData(prev => ({
      ...prev,
      characteristicIds: prev.characteristicIds.includes(characteristicId)
        ? prev.characteristicIds.filter(id => id !== characteristicId)
        : [...prev.characteristicIds, characteristicId]
    }));
  };

  if (isMobileView) {
    return (
      <MainLayout
        title="Lista de Productos"
        subtitle="Acceso restringido"
        icon="fas fa-mobile-alt"
        containerSize="medium"
      >
        <div className="card text-center">
          <div className="card-body">
            <i className="fas fa-mobile-alt" style={{ fontSize: '4rem', color: 'var(--warning-color)', marginBottom: 'var(--spacing-lg)' }}></i>
            <h3>Dispositivo no compatible</h3>
            <p>La lista de productos no está disponible para dispositivos móviles. Por favor, accede desde una computadora de escritorio o laptop.</p>
            <Link to="/administracion" className="btn btn-primary">← Volver al Panel</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title="Lista de Productos"
      subtitle="Gestiona y supervisa todos los productos de tu catálogo"
      icon="fas fa-list"
      containerSize="large"
      headerActions={
        <div className="flex" style={{ gap: 'var(--spacing-sm)' }}>
          <Link to="/admin/add-product" className="btn btn-success">
            <i className="fas fa-plus"></i>
            Agregar Producto
          </Link>
          <Link to="/administracion" className="btn btn-outline-primary">← Volver al Panel</Link>
        </div>
      }
    >
      {products.length > 0 ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-table"></i>
              Tabla de Productos
            </h2>
          </div>
          <div className="card-body p-0">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'var(--bg-primary)' }}>
                  <tr>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>ID</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Nombre</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Categoría</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 'var(--spacing-md)', fontWeight: '500', color: 'var(--text-secondary)' }}>{product.id}</td>
                      <td style={{ padding: 'var(--spacing-md)', fontWeight: '600', color: 'var(--text-primary)' }}>{product.name}</td>
                      <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                        {product.category?.name || mockCategories.find(cat => cat.id === product.categoryId)?.name || 'Sin categoría'}
                      </td>
                      <td className="actions-cell" style={{ padding: 'var(--spacing-md)' }}>
                        <div className="flex flex-center" style={{ gap: 'var(--spacing-xs)' }}>
                          <button 
                            onClick={() => handleEditClick(product)}
                            className="action-button edit-button"
                          >
                            <i className="fas fa-edit"></i>
                            Editar
                          </button>
                          <button 
                            className="action-button delete-button" 
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <i className="fas fa-trash"></i>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-box-open"></i>
          </div>
          <h3>No hay productos registrados</h3>
          <p>No tienes productos en tu catálogo. Agrega el primer producto para comenzar.</p>
          <Link to="/admin/add-product" className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Agregar Primer Producto
          </Link>
        </div>
      )}

      {/* Modal de Edición */}
      {showEditModal && productToEdit && (
        <div className="delete-modal-overlay">
          <div className="delete-modal" style={{ maxWidth: '900px' }}>
            <div className="delete-modal-header">
              <h3>Editar Producto</h3>
              <button onClick={cancelEdit} className="close-modal-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
                        <form onSubmit={handleEditSubmit} className="delete-modal-content">
              {/* Tabs Navigation */}
              <div className="tabs-navigation" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <button 
                  type="button"
                  className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  <i className="fas fa-info-circle"></i>
                  Información Básica
                </button>
                <button 
                  type="button"
                  className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
                  onClick={() => setActiveTab('images')}
                >
                  <i className="fas fa-images"></i>
                  Imágenes
                  {editFormData.imageUrls.filter(url => url.trim()).length > 0 && (
                    <span className="tab-badge">{editFormData.imageUrls.filter(url => url.trim()).length}</span>
                  )}
                </button>
                <button 
                  type="button"
                  className={`tab-button ${activeTab === 'characteristics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('characteristics')}
                >
                  <i className="fas fa-cogs"></i>
                  Características
                  {editFormData.characteristicIds.length > 0 && (
                    <span className="tab-badge">{editFormData.characteristicIds.length}</span>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Información Básica */}
                {activeTab === 'basic' && (
                  <div className="tab-pane">
                    <div className="form-group">
                      <label className="form-label">Nombre del producto:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editFormData.name}
                        onChange={(e) => handleEditInputChange('name', e.target.value)}
                        placeholder="Ej: Sedán Familiar Confortable"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Descripción:</label>
                      <textarea
                        className="form-control"
                        value={editFormData.description}
                        onChange={(e) => handleEditInputChange('description', e.target.value)}
                        placeholder="Describe las características del vehículo..."
                        rows="4"
                        required
                      />
                    </div>

                    <div className="grid grid-2" style={{ gap: 'var(--spacing-md)' }}>
                      <div className="form-group">
                        <label className="form-label">Precio:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editFormData.price}
                          onChange={(e) => handleEditInputChange('price', e.target.value)}
                          placeholder="Ej: $40/día"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Categoría:</label>
                        <select
                          className="form-control"
                          value={editFormData.categoryId}
                          onChange={(e) => handleEditInputChange('categoryId', e.target.value)}
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
                    </div>
                  </div>
                )}

                {/* Imágenes */}
                {activeTab === 'images' && (
                  <div className="tab-pane">
                    <div className="form-group">
                      <label className="form-label">Imágenes del Producto:</label>
                      <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                        {editFormData.imageUrls.length > 0 ? (
                          editFormData.imageUrls.map((url, index) => (
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
                      {editFormData.imageUrls.some(url => url.trim()) ? (
                        <div>
                          <label className="form-label">Vista previa:</label>
                          <div className="grid grid-4" style={{ gap: 'var(--spacing-sm)' }}>
                            {editFormData.imageUrls
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
                            {editFormData.imageUrls.filter(url => url.trim()).length > 4 && (
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
                                +{editFormData.imageUrls.filter(url => url.trim()).length - 4} más
                              </div>
                            )}
                          </div>
                        </div>
                      ) : editFormData.imageUrls.length > 0 ? (
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
                  </div>
                )}

                {/* Características */}
                {activeTab === 'characteristics' && (
                  <div className="tab-pane">
                    <div className="form-group">
                      <label className="form-label">Características del Vehículo:</label>
                      <div className="grid grid-4" style={{ gap: 'var(--spacing-sm)' }}>
                        {characteristics.map(characteristic => {
                          const isSelected = editFormData.characteristicIds.includes(characteristic.id);
                          return (
                            <div 
                              key={characteristic.id} 
                              className="card"
                              onClick={() => handleCharacteristicToggle(characteristic.id)}
                              style={{ 
                                cursor: 'pointer', 
                                padding: 'var(--spacing-sm)', 
                                textAlign: 'center',
                                position: 'relative',
                                transition: 'all 0.2s ease',
                                border: isSelected 
                                  ? '2px solid var(--primary-color)' 
                                  : '2px solid var(--border-color)',
                                background: isSelected 
                                  ? 'var(--primary-color)' 
                                  : 'white',
                                transform: isSelected ? 'translateY(-2px)' : 'none',
                                boxShadow: isSelected 
                                  ? '0 4px 12px rgba(245, 166, 35, 0.3)' 
                                  : '0 2px 4px rgba(0, 0, 0, 0.1)'
                              }}
                            >
                              <i 
                                className={characteristic.icon} 
                                style={{ 
                                  fontSize: '1.5rem', 
                                  marginBottom: 'var(--spacing-xs)',
                                  color: isSelected ? 'white' : 'var(--primary-color)',
                                  display: 'block'
                                }}
                              ></i>
                              <div style={{ 
                                fontSize: 'var(--font-size-sm)', 
                                fontWeight: '500',
                                color: isSelected ? 'white' : 'var(--text-primary)',
                                lineHeight: '1.2'
                              }}>
                                {characteristic.name}
                              </div>
                              {isSelected && (
                                <i 
                                  className="fas fa-check" 
                                  style={{ 
                                    position: 'absolute', 
                                    top: '5px', 
                                    right: '5px',
                                    color: 'white',
                                    fontSize: '0.8rem'
                                  }}
                                ></i>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p style={{ 
                        fontSize: 'var(--font-size-sm)', 
                        color: 'var(--text-secondary)', 
                        marginTop: 'var(--spacing-sm)',
                        margin: 'var(--spacing-sm) 0 0 0'
                      }}>
                        Selecciona las características que incluye este vehículo. Puedes seleccionar múltiples opciones.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="delete-modal-actions">
                <button type="button" onClick={cancelEdit} className="cancel-delete-btn">
                  <i className="fas fa-times"></i>
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-success"
                  disabled={editLoading}
                  style={{ 
                    background: 'var(--success-color)', 
                    borderColor: 'var(--success-color)',
                    color: 'white'
                  }}
                >
                  {editLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Actualizando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i>
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AdminProductListPage;
