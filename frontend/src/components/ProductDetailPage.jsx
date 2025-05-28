import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import placeholderImage from '../assets/placeholder_image.webp'; // Usaremos la misma imagen para todas por ahora
import ImageGalleryModal from './ImageGalleryModal'; // Importar el nuevo modal
import AvailabilityCalendar from './AvailabilityCalendar';
import FavoriteButton from './FavoriteButton'; // Importar FavoriteButton
import ShareButton from './ShareButton'; // Importar ShareButton
import ProductReviews from './ProductReviews'; // Importar ProductReviews
import RatingDisplay from './RatingDisplay'; // Importar RatingDisplay
import './ProductDetailPage.css';

const ProductDetailPage = ({ products }) => { // Recibir products como prop
  const { productId } = useParams(); // Obtiene el ID del producto de la URL
  const product = products.find(p => p.id === parseInt(productId));
  const [selectedDates, setSelectedDates] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  if (!product) {
    return (
      <div className="product-detail-container product-not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas ya no está disponible o ha sido eliminado.</p>
        <Link to="/" className="back-to-home-link">Volver al inicio</Link>
      </div>
    );
  }

  // Asegurarse de que product.images exista y tenga elementos
  const images = product.images && product.images.length > 0 ? product.images : [];
  const mainProductImage = images.length > 0 ? images[0] : { url: '', alt: 'Imagen principal no disponible' };
  const thumbnailImages = images.slice(1, 5); // Las siguientes 4 imágenes para la cuadrícula

  // Estado para el modal de la galería completa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Para el modal

  const openModal = (index = 0) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const handleReservationRequest = (reservationData) => {
    setSelectedDates(reservationData);
    setShowReservationModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
  };

  const confirmReservation = () => {
    // Aquí se implementaría la lógica de reserva
    console.log('Reserva confirmada:', {
      productId: product.id,
      productName: product.name,
      ...selectedDates
    });
    
    // Mostrar mensaje de éxito o redirigir
    alert(`¡Reserva confirmada para ${product.name}!\nFechas: ${selectedDates.startDate} - ${selectedDates.endDate}\nNoches: ${selectedDates.nights}`);
    setShowReservationModal(false);
  };

  // Si no hay imágenes, podríamos mostrar un placeholder genérico o un mensaje
  // Por ahora, se asume que placeholderImage está disponible para todas.

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <div className="product-detail-header-content">
          <div className="product-detail-title-section">
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-rating-header">
              <RatingDisplay 
                rating={product.rating || 0} 
                totalReviews={product.totalReviews || 0}
                size="medium"
                compact={false}
              />
            </div>
          </div>
          <div className="product-detail-actions">
            <Link to="/" className="back-arrow">← Volver</Link>
            <ShareButton product={product} />
            <FavoriteButton productId={product.id} />
          </div>
        </div>
      </div>

      {/* Sección de Galería de Imágenes */}
      <div className="product-gallery-block">
        <div className="gallery-main-image-container">
          <img 
            src={placeholderImage} // Usar la imagen importada
            alt={mainProductImage.alt}
            className="gallery-main-image" 
          />
        </div>
        <div className="gallery-thumbnail-grid">
          {thumbnailImages.map((img) => (
            <div key={img.id} className="gallery-thumbnail-item">
              <img 
                src={placeholderImage} // Usar la imagen importada
                alt={img.alt} 
                className="gallery-thumbnail-image" 
              />
            </div>
          ))}
        </div>
        {images.length > 0 && (
          <div className="gallery-see-more">
            <button onClick={() => openModal(0)} className="see-more-link">
              Ver más
            </button>
          </div>
        )}
      </div>

      {/* Información del producto y calendario de disponibilidad */}
      <div className="product-detail-body">        
        <div className="product-detail-info">
          <h2>Descripción</h2>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">Precio: {product.price}</p>
        </div>

        {/* Calendario de Disponibilidad */}
        <div className="product-availability-section">
          <AvailabilityCalendar
            productId={product.id}
            onDateSelect={handleDateSelect}
            onReservationRequest={handleReservationRequest}
          />
        </div>

        {/* Bloque de Características */}
        {product.characteristics && product.characteristics.length > 0 && (
          <div className="product-characteristics-block">
            <h2>Características</h2>
            <div className="characteristics-grid">
              {product.characteristics.map((characteristic) => (
                <div key={characteristic.id} className="characteristic-item">
                  <div className="characteristic-icon">
                    <i className={characteristic.icon}></i>
                  </div>
                  <span className="characteristic-name">{characteristic.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bloque de Políticas del Producto */}
        <div className="product-policies-block">
          <h2 className="policies-title">Políticas del Producto</h2>
          <div className="policies-grid">
            <div className="policy-item">
              <h3 className="policy-title">Política de Uso</h3>
              <p className="policy-description">
                El producto debe ser utilizado únicamente para los fines especificados. 
                Se requiere un manejo cuidadoso y responsable durante todo el período de alquiler. 
                Cualquier uso inadecuado puede resultar en cargos adicionales.
              </p>
            </div>
            
            <div className="policy-item">
              <h3 className="policy-title">Cuidados y Mantenimiento</h3>
              <p className="policy-description">
                Mantener el producto en condiciones óptimas durante el alquiler. 
                Evitar exposición a condiciones extremas de temperatura o humedad. 
                Reportar inmediatamente cualquier daño o mal funcionamiento.
              </p>
            </div>
            
            <div className="policy-item">
              <h3 className="policy-title">Política de Devolución</h3>
              <p className="policy-description">
                El producto debe ser devuelto en las mismas condiciones en que fue entregado. 
                La devolución debe realizarse en la fecha y hora acordadas. 
                Retrasos en la devolución pueden generar cargos adicionales.
              </p>
            </div>
            
            <div className="policy-item">
              <h3 className="policy-title">Responsabilidades del Usuario</h3>
              <p className="policy-description">
                El usuario es responsable de cualquier daño, pérdida o robo del producto durante el período de alquiler. 
                Se requiere proporcionar identificación válida y depósito de seguridad cuando sea aplicable.
              </p>
            </div>
            
            <div className="policy-item">
              <h3 className="policy-title">Cancelaciones</h3>
              <p className="policy-description">
                Las cancelaciones deben realizarse con al menos 24 horas de anticipación. 
                Cancelaciones tardías pueden estar sujetas a penalizaciones. 
                Consulte nuestros términos y condiciones para más detalles.
              </p>
            </div>
            
            <div className="policy-item">
              <h3 className="policy-title">Soporte y Asistencia</h3>
              <p className="policy-description">
                Ofrecemos soporte técnico durante el período de alquiler. 
                Contacte nuestro servicio al cliente para cualquier consulta o problema. 
                Disponible de lunes a viernes de 9:00 AM a 6:00 PM.
              </p>
            </div>
          </div>
        </div>

        {/* Sección de Reseñas y Valoraciones */}
        <ProductReviews productId={product.id} />
      </div>

      {/* Modal de galería de imágenes */}
      {isModalOpen && (
        <ImageGalleryModal 
          images={images} // Pasar todas las imágenes del producto
          initialImageIndex={selectedImageIndex}
          onClose={closeModal} 
        />
      )}

      {/* Modal de confirmación de reserva */}
      {showReservationModal && selectedDates && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <div className="reservation-modal-header">
              <h3>Confirmar Reserva</h3>
              <button onClick={closeReservationModal} className="close-modal-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="reservation-modal-content">
              <div className="reservation-summary">
                <h4>{product.name}</h4>
                <div className="reservation-details">
                  <div className="detail-row">
                    <span className="detail-label">Fecha de entrada:</span>
                    <span className="detail-value">{new Date(selectedDates.startDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Fecha de salida:</span>
                    <span className="detail-value">{new Date(selectedDates.endDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Número de noches:</span>
                    <span className="detail-value">{selectedDates.nights}</span>
                  </div>
                  <div className="detail-row total-row">
                    <span className="detail-label">Precio total:</span>
                    <span className="detail-value">{product.price}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="reservation-modal-actions">
              <button onClick={closeReservationModal} className="cancel-reservation-btn">
                Cancelar
              </button>
              <button onClick={confirmReservation} className="confirm-reservation-btn">
                <i className="fas fa-check"></i>
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
