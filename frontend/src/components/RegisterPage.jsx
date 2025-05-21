import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Validaciones básicas
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    // Aquí irían validaciones más específicas (longitud, formato de email, complejidad de contraseña)

    console.log('Datos de registro:', {
      firstName,
      lastName,
      email,
      password,
    });

    // Simulación de registro exitoso
    alert('¡Registro exitoso! Serás redirigido a la página principal.'); // Feedback temporal
    // Aquí, en una app real, se llamaría a una API y se manejaría la respuesta
    // Por ahora, no guardaremos el usuario, solo simulamos el flujo

    // Limpiar formulario (opcional, ya que redirigimos)
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    
    navigate('/'); // Redirigir a la página principal o a login después del registro
  };

  return (
    <div className="register-page-container"> {/* Usaremos esta clase para el CSS */}
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="firstName">Nombre:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
