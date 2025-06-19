import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ErrorMessage from './ErrorMessage';
import MainLayout from './MainLayout';
import './AdminCharacteristics.css';

const AdminCharacteristics = () => {
  const { user } = useAuth();
  const [characteristics, setCharacteristics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCharacteristic, setEditingCharacteristic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: ''
  });

  // Lista de iconos populares para seleccionar
  const popularIcons = [
    { icon: 'fas fa-snowflake', name: 'Aire Acondicionado' },
    { icon: 'fas fa-map-marked-alt', name: 'GPS/Navegación' },
    { icon: 'fab fa-bluetooth', name: 'Bluetooth' },
    { icon: 'fas fa-cogs', name: 'Transmisión Automática' },
    { icon: 'fas fa-wifi', name: 'WiFi' },
    { icon: 'fab fa-usb', name: 'Puerto USB' },
    { icon: 'fas fa-couch', name: 'Asientos Cómodos' },
    { icon: 'fas fa-satellite', name: 'Radio Satelital' },
    { icon: 'fas fa-video', name: 'Cámara' },
    { icon: 'fas fa-tachometer-alt', name: 'Control de Crucero' },
    { icon: 'fas fa-car', name: 'Automóvil' },
    { icon: 'fas fa-gas-pump', name: 'Combustible' },
    { icon: 'fas fa-charging-station', name: 'Carga Eléctrica' },
    { icon: 'fas fa-shield-alt', name: 'Seguridad' },
    { icon: 'fas fa-music', name: 'Sistema de Audio' },
    { icon: 'fas fa-sun', name: 'Techo Solar' }
  ];

  useEffect(() => {
    loadCharacteristics();
  }, []);

  const loadCharacteristics = async () => {
    try {
      setLoading(true);
      setError('');
      const characteristicsData = await api.getCharacteristics();
      setCharacteristics(characteristicsData);
    } catch (error) {
      console.error('Error loading characteristics:', error);
      setError('Error al cargar las características. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.name.trim() || !formData.icon.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      if (editingCharacteristic) {
        const updatedCharacteristic = await api.updateCharacteristic(editingCharacteristic.id, formData);
        setCharacteristics(characteristics.map(c => 
          c.id === editingCharacteristic.id ? updatedCharacteristic : c
        ));
        setSuccessMessage('Característica actualizada exitosamente.');
      } else {
        const newCharacteristic = await api.createCharacteristic(formData);
        setCharacteristics([...characteristics, newCharacteristic]);
        setSuccessMessage('Característica creada exitosamente.');
      }
      
      handleCancelForm();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving characteristic:', error);
      setError('Error al guardar la característica. Por favor, verifica que el nombre no esté duplicado.');
    }
  };

  const handleEdit = (characteristic) => {
    setEditingCharacteristic(characteristic);
    setFormData({
      name: characteristic.name,
      icon: characteristic.icon
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta característica?')) {
      try {
        setError('');
        await api.deleteCharacteristic(id);
        setCharacteristics(characteristics.filter(c => c.id !== id));
        setSuccessMessage('Característica eliminada exitosamente.');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting characteristic:', error);
        setError('Error al eliminar la característica. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCharacteristic(null);
    setFormData({ name: '', icon: '' });
    setError('');
  };

  const handleIconSelect = (iconClass) => {
    setFormData({ ...formData, icon: iconClass });
  };

  // Verificar si el usuario actual es administrador
  if (!user?.isAdmin) {
    return (
      <MainLayout
        title="Acceso Denegado"
        subtitle="No tienes permisos para acceder a esta sección"
        icon="fas fa-lock"
        containerSize="small"
      >
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Contacta al administrador si necesitas acceso a esta funcionalidad.</p>
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout
        title="Administrar Características"
        subtitle="Cargando características del sistema..."
        icon="fas fa-cog"
        containerSize="large"
      >
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando características...</p>
        </div>
      </MainLayout>
    );
  }

  // Calcular estadísticas
  const totalCharacteristics = characteristics.length;
  const systemCharacteristics = characteristics.filter(c => 
    popularIcons.some(pi => pi.icon === c.icon)
  ).length;
  const customCharacteristics = totalCharacteristics - systemCharacteristics;

  const stats = [
    {
      label: 'Total Características',
      value: totalCharacteristics,
      icon: 'fas fa-list'
    },
    {
      label: 'Características del Sistema',
      value: systemCharacteristics,
      icon: 'fas fa-star'
    },
    {
      label: 'Características Personalizadas',
      value: customCharacteristics,
      icon: 'fas fa-user-cog'
    }
  ];

  const headerActions = (
    <button 
      className="btn btn-primary"
      onClick={() => setShowForm(true)}
      disabled={showForm}
    >
      <i className="fas fa-plus"></i>
      Añadir Característica
    </button>
  );

  return (
    <MainLayout
      title="Administrar Características"
      subtitle="Gestiona las características disponibles para los productos"
      icon="fas fa-cog"
      stats={stats}
      headerActions={headerActions}
      containerSize="large"
    >
      <ErrorMessage message={error} type="error" />
      {successMessage && (
        <ErrorMessage message={successMessage} type="success" />
      )}

      {showForm && (
        <div className="characteristic-form-overlay">
          <div className="characteristic-form-container">
            <div className="form-header">
              <h3>{editingCharacteristic ? 'Editar Característica' : 'Nueva Característica'}</h3>
              <button className="close-btn" onClick={handleCancelForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="characteristic-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre de la Característica:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Aire Acondicionado"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon" className="form-label">Ícono Seleccionado:</label>
                <div className="selected-icon">
                  {formData.icon && (
                    <>
                      <i className={formData.icon}></i>
                      <span>{formData.icon}</span>
                    </>
                  )}
                  {!formData.icon && <span className="no-icon">Ningún ícono seleccionado</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Seleccionar Ícono:</label>
                <div className="icon-grid">
                  {popularIcons.map((iconData, index) => (
                    <div 
                      key={index}
                      className={`icon-option ${formData.icon === iconData.icon ? 'selected' : ''}`}
                      onClick={() => handleIconSelect(iconData.icon)}
                      title={iconData.name}
                    >
                      <i className={iconData.icon}></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="customIcon" className="form-label">O ingresar ícono personalizado:</label>
                <input
                  type="text"
                  id="customIcon"
                  className="form-control"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Ej: fas fa-car"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={handleCancelForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCharacteristic ? 'Actualizar' : 'Crear'} Característica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {characteristics.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-list-alt"></i>
          <h3>No hay características registradas</h3>
          <p>Comienza creando la primera característica para tus productos</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <i className="fas fa-plus"></i>
            Crear Primera Característica
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h3>Características del Sistema</h3>
            <p>Gestiona todas las características disponibles</p>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Ícono</th>
                    <th>Nombre</th>
                    <th>Clase del Ícono</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {characteristics.map((characteristic, index) => {
                    const isSystemIcon = popularIcons.some(pi => pi.icon === characteristic.icon);
                    return (
                      <tr key={characteristic.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                        <td>
                          <div className="characteristic-icon">
                            <i className={characteristic.icon}></i>
                          </div>
                        </td>
                        <td>
                          <span className="characteristic-name">{characteristic.name}</span>
                        </td>
                        <td>
                          <code className="icon-class">{characteristic.icon}</code>
                        </td>
                        <td>
                          <span className={`badge ${isSystemIcon ? 'badge-success' : 'badge-info'}`}>
                            {isSystemIcon ? 'Sistema' : 'Personalizada'}
                          </span>
                        </td>
                        <td>
                          <div className="actions-container">
                            <button
                              className="btn btn-sm btn-outline"
                              onClick={() => handleEdit(characteristic)}
                              title="Editar característica"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(characteristic.id)}
                              title="Eliminar característica"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AdminCharacteristics; 