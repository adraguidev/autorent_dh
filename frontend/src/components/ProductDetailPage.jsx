import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { calculateDaysBetween, parseDateLocal } from '../utils/dateUtils';
import NotificationService from '../services/notificationService';
import placeholderImage from '../assets/placeholder_image.webp';
import ImageGalleryModal from './ImageGalleryModal';
import AvailabilityCalendar from './AvailabilityCalendar';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import ProductReviews from './ProductReviews';
import RatingDisplay from './RatingDisplay';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await api.getProductById(productId);
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error('ProductDetailPage: Error fetching product:', err);
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setError('ID de producto no válido');
      setLoading(false);
    }
  }, [productId]);

  const openModal = (index = 0) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateSelect = useCallback((dates) => {
    setSelectedDates(dates);
  }, []);

  const handleReservationRequest = useCallback((reservationData) => {
    setSelectedDates(reservationData);
    setShowReservationModal(true);
  }, []);

  const calculateTotalPrice = (days, pricePerDay) => {
    // Convertir días a número si es string
    const daysNumber = typeof days === 'string' ? parseInt(days) : days;
    
    if (!daysNumber || !pricePerDay || isNaN(daysNumber)) {
      return '$0';
    }
    
    // Extraer el número del precio (ej: "$70/día" -> 70)
    const price = pricePerDay.replace(/[^\d]/g, '');
    const priceNumber = parseInt(price);
    
    if (isNaN(priceNumber)) {
      return pricePerDay;
    }
    
    const total = priceNumber * daysNumber;
    return `$${total}`;
  };

  // Función para calcular días desde las fechas del modal
  const calculateDaysFromDates = (startDateStr, endDateStr) => {
    return calculateDaysBetween(startDateStr, endDateStr);
  };

  // Función para calcular precio total como número (para backend)
  const calculateTotalPriceNumber = (days, pricePerDay) => {
    if (!days || !pricePerDay) return 0;
    
    // Extraer el número del precio (ej: "$70/día" -> 70)
    const price = pricePerDay.replace(/[^\d]/g, '');
    const priceNumber = parseInt(price);
    
    if (isNaN(priceNumber)) return 0;
    
    return priceNumber * days;
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
  };

  const confirmReservation = async () => {
    try {
      // Calcular días si no están disponibles
      const calculatedDays = selectedDates.days || calculateDaysBetween(selectedDates.startDate, selectedDates.endDate);

      // Verificar que el usuario esté autenticado
      if (!isAuthenticated()) {
        const result = await NotificationService.requireLogin();
        if (result.isConfirmed) {
          navigate('/login');
        }
        return;
      }

      // Verificar disponibilidad antes de crear la reserva
      const isAvailable = await api.checkAvailability(
        product.id,
        selectedDates.startDate,
        selectedDates.endDate
      );

      if (!isAvailable.available) {
        NotificationService.warning('Fechas no disponibles', 'Las fechas seleccionadas ya no están disponibles. Por favor, selecciona otras fechas.');
        setShowReservationModal(false);
        setSelectedDates(null); // Limpiar fechas para actualizar el calendario
        return;
      }

      // Crear la reserva en el backend
      const reservationData = {
        productId: product.id,
        userId: 1, // Por ahora uso un userId fijo, luego se puede obtener del contexto de auth
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
        days: calculatedDays,
        totalPrice: calculateTotalPriceNumber(calculatedDays, product.price)
      };

      const createdReservation = await api.createReservation(reservationData);
      
      const result = await NotificationService.reservationSuccess(
        product.name, 
        selectedDates.startDate, 
        selectedDates.endDate, 
        calculatedDays
      );
      
      setShowReservationModal(false);
      
      // Limpiar las fechas seleccionadas para forzar actualización del calendario
      setSelectedDates(null);
      
      // Si el usuario quiere ver sus reservas, navegar
      if (result.isConfirmed) {
        navigate('/reservations');
      }
      
    } catch (error) {
      console.error('❌ Error al crear reserva:', error);
      NotificationService.error('Error al confirmar la reserva', 'Por favor, intenta de nuevo.');
    }
  };

  const handleReservationClick = () => {
    if (isAuthenticated()) {
      navigate(`/reservation/${product.id}`);
    } else {
      navigate(`/login?redirect=/reservation/${product.id}`);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-loading">
          <div className="loading-spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-error">
          <div className="error-content">
            <i className="fas fa-exclamation-circle"></i>
            <h2>Producto no encontrado</h2>
            <p>El producto que buscas no está disponible o ha sido eliminado.</p>
            <Link to="/" className="back-to-home-btn">
              <i className="fas fa-home"></i>
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = product.imageUrls && product.imageUrls.length > 0 ? 
    product.imageUrls.map((url, index) => {
      // Corregir las URLs que vienen con /src/assets/ para que funcionen en producción
      let correctedUrl = placeholderImage; // default fallback
      
      if (url && url !== '' && !url.includes('undefined')) {
        correctedUrl = url.replace('/src/assets/', '/assets/');
        // Si la URL corregida no funciona, usar placeholder
        // El navegador intentará cargar la imagen y si falla, mostrará el placeholder
      }
      
      return { 
        id: index, 
        url: correctedUrl, 
        alt: `${product.name} ${index + 1}`,
        fallback: placeholderImage
      };
    }) : 
    [{ id: 0, url: placeholderImage, alt: product.name, fallback: placeholderImage }];

  return (
    <div className="product-detail-page">
      {/* Breadcrumb y navegación */}
      <div className="breadcrumb-section">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">
            <i className="fas fa-home"></i>
            Inicio
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/categoria/${product.category?.id}`} className="breadcrumb-link">
            {product.category?.name || 'Categoría'}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="product-detail-container">
        {/* Sección superior - Imagen y información básica */}
        <div className="product-main-section">
          {/* Galería de imágenes */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                src={images[0]?.url || placeholderImage}
                alt={images[0]?.alt || product.name}
                className="main-image"
                onClick={() => openModal(0)}
                onError={(e) => {
                  e.target.src = placeholderImage;
                }}
              />
              {images.length > 1 && (
                <button className="gallery-expand-btn" onClick={() => openModal(0)}>
                  <i className="fas fa-expand"></i>
                  Ver galería
                </button>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="thumbnail-gallery">
                {images.slice(1, 5).map((image, index) => (
                  <div 
                    key={image.id} 
                    className="thumbnail-item"
                    style={{
                      backgroundImage: `url(${image.url || placeholderImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                    onClick={() => openModal(index + 1)}
                    title={image.alt}
                  >
                  </div>
                ))}
                {images.length > 5 && (
                  <div className="thumbnail-item more-images" onClick={() => openModal(5)}>
                    <span className="more-count">+{images.length - 5}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-title-section">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-category">
                  <i className={`fas fa-tag`}></i>
                  {product.category?.name}
                </div>
              </div>
              
              <div className="product-actions">
                <ShareButton product={product} />
                <FavoriteButton productId={product.id} inline={true} />
              </div>
            </div>

            <div className="product-rating-section">
              <RatingDisplay
                rating={product.averageRating || 0}
                totalReviews={product.totalReviews || 0}
                size="large"
                compact={false}
              />
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-price">
              <span className="price-label">Precio por día:</span>
              <span className="price-value">{product.price}</span>
            </div>

            {/* Características */}
            {product.characteristics && product.characteristics.length > 0 && (
              <div className="product-features">
                <h3>Características incluidas</h3>
                <div className="features-grid">
                  {product.characteristics.map((characteristic) => (
                    <div key={characteristic.id} className="feature-item">
                      <div className="feature-icon">
                        <i className={characteristic.icon}></i>
                      </div>
                      <span className="feature-name">{characteristic.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección de disponibilidad */}
        <div className="availability-section">
          <div className="section-header">
            <h2>Disponibilidad</h2>
            <p>Selecciona las fechas para verificar la disponibilidad del producto</p>
          </div>
          <AvailabilityCalendar
            key={selectedDates ? 'with-dates' : 'no-dates'}
            productId={product.id}
            onDateSelect={handleDateSelect}
            onReservationRequest={handleReservationRequest}
          />
        </div>

        {/* Sección de reseñas */}
        <div className="reviews-section">
          <ProductReviews productId={product.id} />
        </div>

        {/* Sección de políticas */}
        <div className="policies-section">
          <div className="section-header">
            <h2>Políticas y términos</h2>
            <p>Información importante sobre el uso y cuidado del producto</p>
          </div>
          
          <div className="policies-grid">
            <div className="policy-card">
              <div className="policy-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Política de Uso</h3>
              <p>Uso responsable y cuidadoso durante todo el período de alquiler. Seguir las instrucciones proporcionadas.</p>
            </div>

            <div className="policy-card">
              <div className="policy-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h3>Mantenimiento</h3>
              <p>Mantener el producto en óptimas condiciones. Reportar cualquier daño inmediatamente.</p>
            </div>

            <div className="policy-card">
              <div className="policy-icon">
                <i className="fas fa-undo"></i>
              </div>
              <h3>Devolución</h3>
              <p>Devolver en las mismas condiciones y en la fecha acordada. Retrasos pueden generar cargos extra.</p>
            </div>

            <div className="policy-card">
              <div className="policy-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <h3>Responsabilidad</h3>
              <p>El usuario es responsable de daños, pérdidas o robos durante el período de alquiler.</p>
            </div>

            <div className="policy-card">
              <div className="policy-icon">
                <i className="fas fa-calendar-times"></i>
              </div>
              <h3>Cancelaciones</h3>
              <p>Cancelaciones con 24h de anticipación. Cancelaciones tardías sujetas a penalizaciones.</p>
            </div>

            <div className="policy-card">
              <div className="policy-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Soporte</h3>
              <p>Soporte técnico disponible durante el alquiler. Lunes a viernes de 9:00 AM a 6:00 PM.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de galería de imágenes */}
      {isModalOpen && (
        <ImageGalleryModal
          images={images}
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
                    <span className="detail-label">Fecha de recogida:</span>
                    <span className="detail-value">{parseDateLocal(selectedDates.startDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Fecha de entrega:</span>
                    <span className="detail-value">{parseDateLocal(selectedDates.endDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Número de días:</span>
                    <span className="detail-value">
                      {(() => {
                        const calculatedDays = selectedDates.days || calculateDaysBetween(selectedDates.startDate, selectedDates.endDate);
                        return calculatedDays ? `${calculatedDays} día${calculatedDays !== 1 ? 's' : ''}` : 'No calculado';
                      })()}
                    </span>
                  </div>
                  <div className="detail-row total-row">
                    <span className="detail-label">Precio total:</span>
                    <span className="detail-value">
                      {(() => {
                        const calculatedDays = selectedDates.days || calculateDaysBetween(selectedDates.startDate, selectedDates.endDate);
                        return calculatedDays ? calculateTotalPrice(calculatedDays, product.price) : product.price;
                      })()}
                    </span>
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
