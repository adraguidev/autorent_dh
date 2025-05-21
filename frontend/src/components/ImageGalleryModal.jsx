// src/components/ImageGalleryModal.jsx
import React, { useState, useEffect } from 'react';
import './ImageGalleryModal.css';
import placeholderImage from '../assets/placeholder_image.webp'; // Usaremos el mismo placeholder

const ImageGalleryModal = ({ images, initialImageIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);

  if (!images || images.length === 0) {
    return null; // No mostrar nada si no hay imágenes
  }

  const currentImage = images[currentIndex] || { url: '', alt: 'Imagen no disponible' };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Permitir cerrar el modal con la tecla Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-modal-close-button" onClick={onClose}>
          &times; {/* Símbolo de cierre (X) */}
        </button>
        
        <div className="gallery-modal-image-container">
          <img 
            src={placeholderImage} // Siempre usamos el placeholder por ahora
            alt={currentImage.alt} 
            className="gallery-modal-main-image" 
          />
        </div>

        {images.length > 1 && (
          <div className="gallery-modal-navigation">
            <button onClick={goToPrevious} className="gallery-modal-nav-button prev">
              &#10094; {/* Flecha izquierda */}
            </button>
            <button onClick={goToNext} className="gallery-modal-nav-button next">
              &#10095; {/* Flecha derecha */}
            </button>
          </div>
        )}

        <div className="gallery-modal-counter">
          {currentIndex + 1} / {images.length}
        </div>
        
        {/* Opcional: Grilla de miniaturas dentro del modal */}
        {/* <div className="gallery-modal-thumbnails">
          {images.map((img, index) => (
            <img
              key={img.id || index}
              src={placeholderImage}
              alt={img.alt}
              className={`gallery-modal-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ImageGalleryModal;
