import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ErrorMessage from './ErrorMessage';
import MainLayout from './MainLayout';
import './AdminUserManagement.css';

const AdminUserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const usersData = await api.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Error al cargar los usuarios. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdmin = async (userId, currentIsAdmin) => {
    try {
      setError('');
      setSuccessMessage('');

      const updatedUser = await api.toggleAdminStatus(userId);
      
      // Actualizar la lista local
      setUsers(users.map(u => 
        u.id === userId ? { ...u, isAdmin: updatedUser.isAdmin } : u
      ));

      const action = updatedUser.isAdmin ? 'otorgado' : 'revocado';
      setSuccessMessage(`Permisos de administrador ${action} exitosamente.`);
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error toggling admin status:', error);
      setError('Error al cambiar permisos de administrador. Por favor, intenta de nuevo.');
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
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
          <p>No tienes permisos para acceder a la gestión de usuarios.</p>
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout
        title="Gestión de Usuarios"
        subtitle="Cargando información de usuarios..."
        icon="fas fa-users"
        containerSize="large"
      >
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando usuarios...</span>
        </div>
      </MainLayout>
    );
  }

  const stats = [
    { number: users.length, label: 'Total Usuarios' },
    { number: users.filter(u => u.isAdmin).length, label: 'Administradores' },
    { number: users.filter(u => !u.isAdmin).length, label: 'Usuarios Regulares' }
  ];

  return (
    <MainLayout
      title="Gestión de Usuarios"
      subtitle="Administra los usuarios registrados y sus permisos de administrador"
      icon="fas fa-users"
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

      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-users"></i>
          </div>
          <h3>No hay usuarios registrados</h3>
          <p>No hay usuarios registrados en el sistema.</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-table"></i>
              Lista de Usuarios
            </h2>
          </div>
          <div className="card-body p-0">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'var(--bg-primary)' }}>
                  <tr>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Usuario</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Email</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Rol</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', borderBottom: '2px solid var(--border-color)', fontWeight: '600' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(userData => (
                    <tr key={userData.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 'var(--spacing-md)' }}>
                        <div className="flex">
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            background: 'var(--primary-color)', 
                            color: 'white', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontWeight: '600',
                            marginRight: 'var(--spacing-sm)'
                          }}>
                            {getInitials(userData.firstName, userData.lastName)}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                              {userData.firstName} {userData.lastName}
                            </div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                              ID: {userData.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                        {userData.email}
                      </td>
                      <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                        <span className={userData.isAdmin ? 'btn btn-success btn-sm' : 'btn btn-outline btn-sm'} style={{ pointerEvents: 'none' }}>
                          {userData.isAdmin ? 'Administrador' : 'Usuario'}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                        {userData.id !== user.id ? (
                          <button
                            className={userData.isAdmin ? 'btn btn-danger btn-sm' : 'btn btn-primary btn-sm'}
                            onClick={() => handleToggleAdmin(userData.id, userData.isAdmin)}
                            title={userData.isAdmin ? 'Revocar permisos de admin' : 'Otorgar permisos de admin'}
                          >
                            {userData.isAdmin ? (
                              <>
                                <i className="fas fa-user-minus"></i>
                                Revocar Admin
                              </>
                            ) : (
                              <>
                                <i className="fas fa-user-plus"></i>
                                Hacer Admin
                              </>
                            )}
                          </button>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Tú mismo</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AdminUserManagement; 