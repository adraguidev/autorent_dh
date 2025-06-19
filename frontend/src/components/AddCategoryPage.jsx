import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import NotificationService from '../services/notificationService';
import MainLayout from './MainLayout';
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
    <MainLayout
      title="Agregar Nueva Categoría"
      subtitle="Complete la información para crear una nueva categoría de vehículos"
      icon="fas fa-plus-circle"
      containerSize="medium"
    >
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}

      {success && (
        <div className="card" style={{ background: '#d1edff', borderColor: '#28a745', color: '#155724', marginBottom: 'var(--spacing-lg)' }}>
          <div className="card-body">
            <i className="fas fa-check-circle" style={{ color: '#28a745', marginRight: 'var(--spacing-sm)' }}></i>
            {success}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-tag"></i>
            Información de la Categoría
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nombre de la Categoría: *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Compacto, SUV, Deportivo..."
                required
                maxLength="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Descripción: *</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe las características principales de esta categoría de vehículos..."
                required
                maxLength="1000"
                rows="4"
              />
              <small style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 'var(--spacing-xs)' }}>
                {formData.description.length}/1000 caracteres
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="image" className="form-label">URL de la Imagen: *</label>
              <input
                type="url"
                id="image"
                name="image"
                className="form-control"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen-categoria.jpg"
                required
              />
              <small style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 'var(--spacing-xs)' }}>
                Proporciona una URL válida para la imagen representativa de la categoría
              </small>
            </div>

            {formData.image && (
              <div className="form-group">
                <label className="form-label">Vista previa de la imagen:</label>
                <div style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-md)', textAlign: 'center', background: 'var(--bg-primary)' }}>
                  <img 
                    src={formData.image} 
                    alt="Vista previa" 
                    style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: 'var(--radius-md)' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                    onLoad={(e) => {
                      e.target.style.display = 'block';
                      e.target.nextSibling.style.display = 'none';
                    }}
                  />
                  <div style={{ display: 'none', color: 'var(--danger-color)' }}>
                    <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}></i>
                    <br />
                    <span>No se pudo cargar la imagen</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-end" style={{ gap: 'var(--spacing-sm)' }}>
              <button 
                type="button" 
                onClick={handleCancel}
                className="btn btn-outline"
                disabled={loading}
              >
                <i className="fas fa-times"></i>
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-success"
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
    </MainLayout>
  );
};

export default AddCategoryPage; 