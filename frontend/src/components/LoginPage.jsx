import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      
      // Guardar información del usuario en localStorage (temporal)
      localStorage.setItem('user', JSON.stringify(response));
      
      // Limpiar formulario
      setEmail('');
      setPassword('');
      
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
        {error && <p className="error-message">{error}</p>}
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 