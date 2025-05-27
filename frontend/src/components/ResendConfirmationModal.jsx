import React, { useState } from 'react';
import { api } from '../services/api';
import ErrorMessage from './ErrorMessage';
import './ResendConfirmationModal.css';

const ResendConfirmationModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Por favor, ingresa tu dirección de correo electrónico.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await api.resendConfirmationEmail(email);
      setMessage('¡Email de confirmación enviado exitosamente! Revisa tu bandeja de entrada.');
      setMessageType('success');
      
      // Limpiar formulario después de 3 segundos y cerrar modal
      setTimeout(() => {
        setEmail('');
        setMessage('');
        setMessageType('');
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error al reenviar email:', error);
      setMessage(error.response?.data || 'Error al enviar el email. Por favor, intenta de nuevo.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setMessage('');
    setMessageType('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="resend-modal" onClick={(e) => e.stopPropagation()}>
        <div className="resend-modal-header">
          <h2>Reenviar Email de Confirmación</h2>
          <button className="close-button" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="resend-modal-content">
          <div className="info-section">
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="info-text">
              <p>¿No recibiste el email de confirmación? No te preocupes, podemos reenviártelo.</p>
              <p className="info-note">
                <strong>Consejo:</strong> Revisa tu carpeta de spam o correo no deseado antes de solicitar un reenvío.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="resend-form">
            <div className="form-group">
              <label htmlFor="email">Dirección de correo electrónico:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={loading}
              />
            </div>

            {message && (
              <ErrorMessage message={message} type={messageType} />
            )}

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={handleClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="resend-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Reenviar Email
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResendConfirmationModal; 