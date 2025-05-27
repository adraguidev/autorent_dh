import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import ErrorMessage from './ErrorMessage';
import ResendConfirmationModal from './ResendConfirmationModal';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResendModal, setShowResendModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Validaciones básicas
    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        email,
        password
      };

      const response = await api.loginUser(userData);
      
      // Usar el contexto de autenticación
      login(response);
      
      // Limpiar formulario
      setEmail('');
      setPassword('');
      
      // Mostrar mensaje de bienvenida y redirigir
      alert(`¡Bienvenido ${response.firstName}!`);
      navigate('/'); // Redirigir a la página principal
    } catch (error) {
      console.error('Error en el login:', error);
      setError(error.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
        <ErrorMessage message={error} type="error" />
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
        </form>
        <div className="auth-links">
          <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
          <p>
            ¿No recibiste el email de confirmación? 
            <button 
              type="button" 
              className="link-button" 
              onClick={() => setShowResendModal(true)}
            >
              Reenviar email
            </button>
          </p>
        </div>
      </div>

      {/* Modal de reenvío de confirmación */}
      <ResendConfirmationModal 
        isOpen={showResendModal} 
        onClose={() => setShowResendModal(false)} 
      />
    </div>
  );
};

export default LoginPage; 