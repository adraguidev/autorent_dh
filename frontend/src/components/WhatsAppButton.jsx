import React, { useState } from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Número de WhatsApp del proveedor
  const whatsappNumber = "+51994762399";
  
  // Mensaje predefinido
  const defaultMessage = "Hola! Me interesa obtener más información sobre los productos de AutoRent. ¿Podrían ayudarme?";

  const handleWhatsAppClick = () => {
    try {
      // Detectar si es un dispositivo móvil
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Formatear el número (remover espacios y caracteres especiales, mantener solo dígitos)
      const formattedNumber = whatsappNumber.replace(/[^\d]/g, '');
      
      // Codificar el mensaje para URL
      const encodedMessage = encodeURIComponent(defaultMessage);
      
      // Crear URLs de WhatsApp
      const whatsappAppURL = `whatsapp://send?phone=${formattedNumber}&text=${encodedMessage}`;
      const whatsappWebURL = `https://web.whatsapp.com/send?phone=${formattedNumber}&text=${encodedMessage}`;
      
      console.log('Intentando abrir WhatsApp app:', whatsappAppURL);
      
      if (isMobile) {
        // Para dispositivos móviles, usar directamente whatsapp://
        window.open(whatsappAppURL, '_blank');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        // Para escritorio, intentar primero la app de escritorio
        const newWindow = window.open(whatsappAppURL, '_blank');
        
        // Si no se pudo abrir la app, intentar con WhatsApp Web después de un breve delay
        setTimeout(() => {
          if (!newWindow || newWindow.closed) {
            console.log('App de WhatsApp no disponible, abriendo WhatsApp Web:', whatsappWebURL);
            window.open(whatsappWebURL, '_blank');
          }
        }, 1000);
        
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
      
    } catch (error) {
      console.error('Error al intentar abrir WhatsApp:', error);
      // Mostrar mensaje de error
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 5000);
    }
  };

  return (
    <>
      {/* Botón flotante de WhatsApp */}
      <div 
        className="whatsapp-button"
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        title="Contactar por WhatsApp"
      >
        <svg 
          className="whatsapp-icon"
          viewBox="0 0 24 24" 
          width="28" 
          height="28"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="whatsapp-tooltip">
            Contactar por WhatsApp
          </div>
        )}
      </div>

      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="whatsapp-notification success">
          <div className="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            <span>¡WhatsApp abierto correctamente!</span>
          </div>
        </div>
      )}

      {/* Mensaje de error */}
      {showErrorMessage && (
        <div className="whatsapp-notification error">
          <div className="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Error al abrir WhatsApp. Verifica que tengas la aplicación instalada.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton; 