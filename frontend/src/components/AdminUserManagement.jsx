import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ErrorMessage from './ErrorMessage';
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
      <div className="admin-access-denied">
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="admin-user-management">
      <div className="admin-header">
        <h1>Gestión de Usuarios</h1>
        <p>Administra los usuarios registrados y sus permisos de administrador</p>
      </div>

      <ErrorMessage message={error} type="error" />
      {successMessage && (
        <ErrorMessage message={successMessage} type="success" />
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando usuarios...</p>
        </div>
      ) : (
        <div className="users-container">
          <div className="users-stats">
            <div className="stat-card">
              <h3>Total Usuarios</h3>
              <span className="stat-number">{users.length}</span>
            </div>
            <div className="stat-card">
              <h3>Administradores</h3>
              <span className="stat-number">{users.filter(u => u.isAdmin).length}</span>
            </div>
            <div className="stat-card">
              <h3>Usuarios Regulares</h3>
              <span className="stat-number">{users.filter(u => !u.isAdmin).length}</span>
            </div>
          </div>

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(userData => (
                  <tr key={userData.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {getInitials(userData.firstName, userData.lastName)}
                        </div>
                        <div className="user-details">
                          <span className="user-name">
                            {userData.firstName} {userData.lastName}
                          </span>
                          <span className="user-id">ID: {userData.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="user-email">{userData.email}</span>
                    </td>
                    <td>
                      <span className={`role-badge ${userData.isAdmin ? 'admin' : 'user'}`}>
                        {userData.isAdmin ? 'Administrador' : 'Usuario'}
                      </span>
                    </td>
                    <td>
                      <div className="actions-container">
                        {userData.id !== user.id ? (
                          <button
                            className={`toggle-admin-btn ${userData.isAdmin ? 'revoke' : 'grant'}`}
                            onClick={() => handleToggleAdmin(userData.id, userData.isAdmin)}
                            title={userData.isAdmin ? 'Revocar permisos de admin' : 'Otorgar permisos de admin'}
                          >
                            {userData.isAdmin ? 'Revocar Admin' : 'Hacer Admin'}
                          </button>
                        ) : (
                          <span className="current-user-note">Tú</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="no-users">
              <p>No hay usuarios registrados en el sistema.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement; 