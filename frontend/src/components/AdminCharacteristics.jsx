import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ErrorMessage from './ErrorMessage';
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
      <div className="admin-access-denied">
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="admin-characteristics">
      <div className="admin-header">
        <h1>Administrar Características</h1>
        <p>Gestiona las características disponibles para los productos</p>
      </div>

      <ErrorMessage message={error} type="error" />
      {successMessage && (
        <ErrorMessage message={successMessage} type="success" />
      )}

      <div className="characteristics-actions">
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          + Añadir Nueva Característica
        </button>
      </div>

      {showForm && (
        <div className="characteristic-form-overlay">
          <div className="characteristic-form-container">
            <div className="form-header">
              <h3>{editingCharacteristic ? 'Editar Característica' : 'Nueva Característica'}</h3>
              <button className="close-btn" onClick={handleCancelForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="characteristic-form">
              <div className="form-group">
                <label htmlFor="name">Nombre de la Característica:</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Aire Acondicionado"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon">Ícono Seleccionado:</label>
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
                <label>Seleccionar Ícono:</label>
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
                <label htmlFor="customIcon">O ingresar ícono personalizado:</label>
                <input
                  type="text"
                  id="customIcon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Ej: fas fa-car"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCancelForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingCharacteristic ? 'Actualizar' : 'Crear'} Característica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando características...</p>
        </div>
      ) : (
        <div className="characteristics-container">
          <div className="characteristics-stats">
            <div className="stat-card">
              <h3>Total Características</h3>
              <span className="stat-number">{characteristics.length}</span>
            </div>
          </div>

          <div className="characteristics-table-container">
            <table className="characteristics-table">
              <thead>
                <tr>
                  <th>Ícono</th>
                  <th>Nombre</th>
                  <th>Clase del Ícono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {characteristics.map(characteristic => (
                  <tr key={characteristic.id}>
                    <td>
                      <div className="characteristic-icon">
                        <i className={characteristic.icon}></i>
                      </div>
                    </td>
                    <td>
                      <span className="characteristic-name">{characteristic.name}</span>
                    </td>
                    <td>
                      <span className="characteristic-icon-class">{characteristic.icon}</span>
                    </td>
                    <td>
                      <div className="actions-container">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(characteristic)}
                          title="Editar característica"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(characteristic.id)}
                          title="Eliminar característica"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {characteristics.length === 0 && (
            <div className="no-characteristics">
              <i className="fas fa-list-alt"></i>
              <p>No hay características registradas en el sistema.</p>
              <button className="btn-primary" onClick={() => setShowForm(true)}>
                Crear Primera Característica
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCharacteristics; 