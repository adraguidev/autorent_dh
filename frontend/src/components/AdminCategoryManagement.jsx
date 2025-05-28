import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminCategoryManagement.css';

const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [productsInCategory, setProductsInCategory] = useState(0);

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
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setProductsInCategory(category.productCount);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      // Simular llamada a API de eliminación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar la lista de categorías
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.id !== categoryToDelete.id)
      );
      
      // Cerrar modal y limpiar estado
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      setProductsInCategory(0);
      
      alert(`Categoría "${categoryToDelete.name}" eliminada exitosamente.`);
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error al eliminar la categoría. Por favor, intenta de nuevo.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
    setProductsInCategory(0);
  };

  if (loading) {
    return (
      <div className="admin-category-management">
        <div className="loading-container">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando categorías...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-category-management">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Gestión de Categorías</h1>
          <div className="admin-actions">
            <Link to="/admin/add-category" className="add-category-btn">
              <i className="fas fa-plus"></i>
              Agregar Categoría
            </Link>
            <Link to="/administracion" className="back-btn">
              <i className="fas fa-arrow-left"></i>
              Volver
            </Link>
          </div>
        </div>
      </div>

      <div className="categories-container">
        <div className="categories-stats">
          <div className="stat-card">
            <i className="fas fa-tags"></i>
            <div className="stat-info">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Total Categorías</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-box"></i>
            <div className="stat-info">
              <span className="stat-number">
                {categories.reduce((total, cat) => total + cat.productCount, 0)}
              </span>
              <span className="stat-label">Productos Totales</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-exclamation-triangle"></i>
            <div className="stat-info">
              <span className="stat-number">
                {categories.filter(cat => cat.productCount === 0).length}
              </span>
              <span className="stat-label">Categorías Vacías</span>
            </div>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="no-categories">
            <i className="fas fa-folder-open"></i>
            <h3>No hay categorías disponibles</h3>
            <p>Comienza agregando tu primera categoría</p>
            <Link to="/admin/add-category" className="add-first-category-btn">
              <i className="fas fa-plus"></i>
              Agregar Primera Categoría
            </Link>
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-header">
                  <h3 className="category-name">{category.name}</h3>
                  <div className="category-actions">
                    <button 
                      className="edit-btn"
                      title="Editar categoría"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteClick(category)}
                      title="Eliminar categoría"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                
                <p className="category-description">{category.description}</p>
                
                <div className="category-stats">
                  <div className="stat-item">
                    <i className="fas fa-cube"></i>
                    <span>{category.productCount} productos</span>
                  </div>
                  {category.productCount === 0 && (
                    <div className="empty-category-warning">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>Categoría vacía</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
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
    </div>
  );
};

export default AdminCategoryManagement; 