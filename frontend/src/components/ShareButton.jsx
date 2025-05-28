import React, { useState } from 'react';
import './ShareButton.css';
import placeholderImage from '../assets/placeholder_image.webp';

const ShareButton = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
    // Mensaje por defecto
    setCustomMessage(`¡Mira este increíble producto: ${product.name}! ${product.description}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCustomMessage('');
    setSelectedNetwork('');
  };

  const getProductUrl = () => {
    return `${window.location.origin}/product/${product.id}`;
  };

  const shareOnFacebook = () => {
    const url = getProductUrl();
    const text = encodeURIComponent(customMessage);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${text}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const url = getProductUrl();
    const text = encodeURIComponent(`${customMessage} ${url}`);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const url = getProductUrl();
    const text = encodeURIComponent(`${customMessage} ${url}`);
    const shareUrl = `https://wa.me/?text=${text}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = getProductUrl();
    const title = encodeURIComponent(product.name);
    const summary = encodeURIComponent(customMessage);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${title}&summary=${summary}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    const url = getProductUrl();
    const textToCopy = `${customMessage}\n\n${url}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('¡Enlace copiado al portapapeles!');
    } catch (err) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  const handleShare = () => {
    switch (selectedNetwork) {
      case 'facebook':
        shareOnFacebook();
        break;
      case 'twitter':
        shareOnTwitter();
        break;
      case 'whatsapp':
        shareOnWhatsApp();
        break;
      case 'linkedin':
        shareOnLinkedIn();
        break;
      case 'copy':
        copyToClipboard();
        break;
      default:
        alert('Por favor, selecciona una red social');
        return;
    }
    closeModal();
  };

  return (
    <>
      <button className="share-button" onClick={openModal} title="Compartir producto">
        <i className="fas fa-share-alt"></i>
        <span>Compartir</span>
      </button>

      {isModalOpen && (
        <div className="share-modal-overlay" onClick={closeModal}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Compartir Producto</h3>
              <button className="close-share-modal" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="share-modal-content">
              {/* Vista previa del producto */}
              <div className="share-product-preview">
                <div className="share-product-image">
                  <img src={placeholderImage} alt={product.name} />
                </div>
                <div className="share-product-info">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <span className="share-product-price">{product.price}</span>
                  <div className="share-product-url">
                    <small>{getProductUrl()}</small>
                  </div>
                </div>
              </div>

              {/* Mensaje personalizable */}
              <div className="share-message-section">
                <label htmlFor="customMessage">Mensaje personalizado:</label>
                <textarea
                  id="customMessage"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Escribe un mensaje personalizado..."
                  rows="3"
                />
              </div>

              {/* Selección de red social */}
              <div className="share-networks-section">
                <h4>Selecciona dónde compartir:</h4>
                <div className="share-networks-grid">
                  <label className={`share-network-option ${selectedNetwork === 'facebook' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="network"
                      value="facebook"
                      checked={selectedNetwork === 'facebook'}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                    />
                    <div className="network-icon facebook">
                      <i className="fab fa-facebook-f"></i>
                    </div>
                    <span>Facebook</span>
                  </label>

                  <label className={`share-network-option ${selectedNetwork === 'twitter' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="network"
                      value="twitter"
                      checked={selectedNetwork === 'twitter'}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                    />
                    <div className="network-icon twitter">
                      <i className="fab fa-twitter"></i>
                    </div>
                    <span>Twitter</span>
                  </label>

                  <label className={`share-network-option ${selectedNetwork === 'whatsapp' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="network"
                      value="whatsapp"
                      checked={selectedNetwork === 'whatsapp'}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                    />
                    <div className="network-icon whatsapp">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <span>WhatsApp</span>
                  </label>

                  <label className={`share-network-option ${selectedNetwork === 'linkedin' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="network"
                      value="linkedin"
                      checked={selectedNetwork === 'linkedin'}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                    />
                    <div className="network-icon linkedin">
                      <i className="fab fa-linkedin-in"></i>
                    </div>
                    <span>LinkedIn</span>
                  </label>

                  <label className={`share-network-option ${selectedNetwork === 'copy' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="network"
                      value="copy"
                      checked={selectedNetwork === 'copy'}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                    />
                    <div className="network-icon copy">
                      <i className="fas fa-copy"></i>
                    </div>
                    <span>Copiar enlace</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="share-modal-actions">
              <button className="cancel-share-btn" onClick={closeModal}>
                Cancelar
              </button>
              <button 
                className="confirm-share-btn" 
                onClick={handleShare}
                disabled={!selectedNetwork}
              >
                <i className="fas fa-share-alt"></i>
                Compartir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton; 