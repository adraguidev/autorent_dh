import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import NotificationService from '../services/notificationService';
import MainLayout from './MainLayout';
import './AdminCategoryManagement.css';

const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [productsInCategory, setProductsInCategory] = useState(0);
  
  // Estados para edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    imageUrl: ''
  });
  const [editLoading, setEditLoading] = useState(false);
  const location = useLocation();

  // Datos mock de categorías
  const mockCategories = [
    { id: 1, name: 'Compactos', description: 'Vehículos compactos económicos', productCount: 3 },
    { id: 2, name: 'Sedanes', description: 'Vehículos sedán familiares', productCount: 2 },
    { id: 3, name: 'SUV', description: 'Vehículos todoterreno', productCount: 2 },
    { id: 4, name: 'Deportivos', description: 'Vehículos deportivos y de lujo', productCount: 2 },
    { id: 5, name: 'Furgonetas', description: 'Vehículos de carga', productCount: 1 },
    { id: 6, name: 'Minivans', description: 'Vehículos para grupos grandes', productCount: 1 },
    { id: 7, name: 'Eléctricos', description: 'Vehículos eléctricos ecológicos', productCount: 1 },
    { id: 8, name: 'Motocicletas', description: 'Motos y scooters', productCount: 1 },
    { id: 9, name: 'Clásicos', description: 'Vehículos clásicos y vintage', productCount: 1 },
    { id: 10, name: 'Bicicletas', description: 'Bicicletas de montaña y urbanas', productCount: 1 },
    { id: 11, name: 'Premium', description: 'Vehículos de lujo premium', productCount: 1 },
    { id: 12, name: 'Autocaravanas', description: 'Vehículos recreacionales', productCount: 1 },
    { id: 13, name: 'Pickups', description: 'Camionetas pickup', productCount: 1 },
    { id: 14, name: 'ATVs', description: 'Vehículos todo terreno recreacionales', productCount: 0 },
    { id: 15, name: 'Sin usar', description: 'Categoría de prueba sin productos', productCount: 0 }
  ];

  useEffect(() => {
    loadCategories();
  }, [location.key]); // Recargar cuando cambie la ubicación (útil cuando se vuelve de agregar categoría)

  const loadCategories = async () => {
    try {
      setLoading(true);
      // Intentar cargar desde API primero
      try {
        const apiCategories = await api.getCategories();
        setCategories(apiCategories);
      } catch (apiError) {

        // Fallback a datos mock si falla la API
        await new Promise(resolve => setTimeout(resolve, 500));
        setCategories(mockCategories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      NotificationService.error('Error al cargar categorías', 'No se pudieron cargar las categorías.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (category) => {
    const result = await NotificationService.confirmDelete(`la categoría "${category.name}"`);
    if (result.isConfirmed) {
      await confirmDelete(category);
    }
  };

  const confirmDelete = async (category) => {
    if (!category) return;

    try {
      // Intentar eliminar vía API
      try {
        await api.deleteCategory(category.id);
      } catch (apiError) {

        // Simular eliminación si la API no está disponible
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Actualizar la lista de categorías localmente
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.id !== category.id)
      );
      
      NotificationService.toast.success(`Categoría "${category.name}" eliminada exitosamente.`);
    } catch (error) {
      console.error('Error deleting category:', error);
      NotificationService.error('Error al eliminar la categoría', 'Por favor, intenta de nuevo.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
    setProductsInCategory(0);
  };

  // Funciones para edición
  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setEditFormData({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl || ''
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editFormData.name.trim() || !editFormData.description.trim()) {
      NotificationService.error('Error de validación', 'El nombre y la descripción son obligatorios.');
      return;
    }

    setEditLoading(true);
    try {
      const updatedCategory = await api.updateCategory(categoryToEdit.id, editFormData);
      
      // Actualizar la lista de categorías localmente
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.id === categoryToEdit.id ? { ...cat, ...updatedCategory } : cat
        )
      );
      
      NotificationService.toast.success(`Categoría "${editFormData.name}" actualizada exitosamente.`);
      cancelEdit();
    } catch (error) {
      console.error('Error updating category:', error);
      NotificationService.error('Error al actualizar la categoría', 'Por favor, verifica los datos e intenta de nuevo.');
    } finally {
      setEditLoading(false);
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setCategoryToEdit(null);
    setEditFormData({
      name: '',
      description: '',
      imageUrl: ''
    });
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <MainLayout
        title="Gestión de Categorías"
        subtitle="Cargando categorías del sistema..."
        icon="fas fa-tags"
        containerSize="large"
      >
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando categorías...</span>
        </div>
      </MainLayout>
    );
  }

  const stats = [
    { number: categories.length, label: 'Total Categorías' },
    { number: categories.filter(cat => cat.productCount === 0).length, label: 'Categorías Vacías' }
  ];

  const headerActions = (
    <div className="flex">
      <Link to="/admin/add-category" className="btn btn-success">
        <i className="fas fa-plus"></i>
        Agregar Categoría
      </Link>
      <Link to="/administracion" className="btn btn-outline-primary">
        <i className="fas fa-arrow-left"></i>
        Volver
      </Link>
    </div>
  );

  return (
    <MainLayout
      title="Gestión de Categorías"
      subtitle="Organiza y administra las categorías de productos de tu catálogo"
      icon="fas fa-tags"
      showStats={true}
      stats={stats}
      containerSize="large"
      headerActions={headerActions}
    >

      {categories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-folder-open"></i>
          </div>
          <h3>No hay categorías disponibles</h3>
          <p>Comienza agregando tu primera categoría para organizar tu catálogo de productos</p>
          <Link to="/admin/add-category" className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Agregar Primera Categoría
          </Link>
        </div>
      ) : (
        <div className="grid grid-3">
          {categories.map((category) => (
            <div key={category.id} className="card animate-slide-up">
              <div className="card-header">
                <h3 className="card-title">{category.name}</h3>
                <div className="flex">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEditClick(category)}
                    title="Editar categoría"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(category)}
                    title="Eliminar categoría"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                  {category.description}
                </p>
                
                <div className="flex flex-between">
                  <div className="flex">
                    <i className="fas fa-cube" style={{ color: 'var(--primary-color)', marginRight: 'var(--spacing-xs)' }}></i>
                    <span style={{ fontWeight: '500' }}>{category.productCount} productos</span>
                  </div>
                  {category.productCount === 0 && (
                    <div style={{ color: 'var(--warning-color)', fontSize: 'var(--font-size-sm)' }}>
                      <i className="fas fa-exclamation-triangle"></i>
                      <span style={{ marginLeft: 'var(--spacing-xs)' }}>Vacía</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Edición */}
      {showEditModal && categoryToEdit && (
        <div className="delete-modal-overlay">
          <div className="delete-modal" style={{ maxWidth: '600px' }}>
            <div className="delete-modal-header">
              <h3>Editar Categoría</h3>
              <button onClick={cancelEdit} className="close-modal-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="delete-modal-content">
              <div className="form-group">
                <label className="form-label">Nombre de la categoría:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editFormData.name}
                  onChange={(e) => handleEditInputChange('name', e.target.value)}
                  placeholder="Ej: Vehículos Compactos"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descripción:</label>
                <textarea
                  className="form-control"
                  value={editFormData.description}
                  onChange={(e) => handleEditInputChange('description', e.target.value)}
                  placeholder="Descripción de la categoría..."
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL de imagen (opcional):</label>
                <input
                  type="url"
                  className="form-control"
                  value={editFormData.imageUrl}
                  onChange={(e) => handleEditInputChange('imageUrl', e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
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

      {/* Modal de Eliminación */}
      {showDeleteModal && categoryToDelete && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-header">
              <h3>Confirmar Eliminación</h3>
              <button onClick={cancelDelete} className="close-modal-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="delete-modal-content">
              <div className="warning-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              
              <div className="delete-message">
                <h4>¿Estás seguro de que quieres eliminar esta categoría?</h4>
                <div className="category-to-delete">
                  <strong>Categoría: </strong>
                  <span className="category-name-highlight">{categoryToDelete.name}</span>
                </div>
                <div className="category-description-preview">
                  <strong>Descripción: </strong>
                  <span>{categoryToDelete.description}</span>
                </div>
              </div>
              
              <div className="consequences-warning">
                <h5>Consecuencias de esta acción:</h5>
                <ul>
                  {productsInCategory > 0 ? (
                    <>
                      <li>
                        <i className="fas fa-exclamation-circle"></i>
                        Se eliminarán <strong>{productsInCategory}</strong> producto(s) asociado(s) a esta categoría
                      </li>
                      <li>
                        <i className="fas fa-exclamation-circle"></i>
                        Los productos eliminados no podrán ser recuperados
                      </li>
                      <li>
                        <i className="fas fa-exclamation-circle"></i>
                        Las reservas activas de estos productos podrían verse afectadas
                      </li>
                    </>
                  ) : (
                    <li>
                      <i className="fas fa-info-circle"></i>
                      Esta categoría está vacía, no se eliminarán productos
                    </li>
                  )}
                  <li>
                    <i className="fas fa-ban"></i>
                    Esta acción no se puede deshacer
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="delete-modal-actions">
              <button onClick={cancelDelete} className="cancel-delete-btn">
                <i className="fas fa-times"></i>
                Cancelar
              </button>
              <button 
                onClick={confirmDelete} 
                className={`confirm-delete-btn ${productsInCategory > 0 ? 'dangerous' : ''}`}
              >
                <i className="fas fa-trash"></i>
                {productsInCategory > 0 ? 'Eliminar Categoría y Productos' : 'Eliminar Categoría'}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AdminCategoryManagement; 