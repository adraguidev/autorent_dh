import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import NotificationService from '../services/notificationService';
import './AddCategoryPage.css';

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Verificar si el usuario es administrador
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.isAdmin) {
      navigate('/');
      return;
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar mensajes cuando el usuario empiece a escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validaciones básicas
      if (!formData.name.trim()) {
        throw new Error('El nombre de la categoría es obligatorio');
      }

      if (!formData.description.trim()) {
        throw new Error('La descripción es obligatoria');
      }

      if (!formData.image.trim()) {
        throw new Error('La imagen es obligatoria');
      }

      const categoryData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: formData.image.trim()
      };

      await api.createCategory(categoryData);
      
      // Mostrar notificación de éxito
      await NotificationService.success('¡Categoría creada exitosamente!', `La categoría "${categoryData.name}" ha sido creada correctamente.`);
      
      // Redirigir a la gestión de categorías
      navigate('/admin/categories');

    } catch (error) {
      console.error('Error creating category:', error);
      NotificationService.error('Error al crear la categoría', error.message || 'Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/categories');
  };

  return (
    <div className="add-category-page">
      <div className="add-category-container">
        <div className="add-category-header">
          <h1>Agregar Nueva Categoría</h1>
          <p>Complete la información para crear una nueva categoría de vehículos</p>
        </div>

        <form onSubmit={handleSubmit} className="add-category-form">
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              {success}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Nombre de la Categoría: *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej: Compacto, SUV, Deportivo..."
              required
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción: *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe las características principales de esta categoría de vehículos..."
              required
              maxLength="1000"
              rows="4"
            />
            <small className="char-count">
              {formData.description.length}/1000 caracteres
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de la Imagen: *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://ejemplo.com/imagen-categoria.jpg"
              required
            />
            <small className="help-text">
              Proporciona una URL válida para la imagen representativa de la categoría
            </small>
          </div>

          {formData.image && (
            <div className="image-preview">
              <label>Vista previa de la imagen:</label>
              <div className="preview-container">
                <img 
                  src={formData.image} 
                  alt="Vista previa" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                  onLoad={(e) => {
                    e.target.style.display = 'block';
                    e.target.nextSibling.style.display = 'none';
                  }}
                />
                <div className="preview-error" style={{display: 'none'}}>
                  <i className="fas fa-image"></i>
                  <span>No se pudo cargar la imagen</span>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleCancel}
              className="cancel-btn"
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Creando...
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i>
                  Crear Categoría
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage; 