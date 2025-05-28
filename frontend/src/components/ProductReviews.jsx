import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { reviewsService } from '../services/reviewsService';
import './ProductReviews.css';

const ProductReviews = ({ productId }) => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [userReview, setUserReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Estados del formulario de reseña
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId, user, isAuthenticated]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      
      // Cargar reseñas y estadísticas
      const [productReviews, ratingStats] = await Promise.all([
        reviewsService.getProductReviews(productId),
        reviewsService.getProductRatingStats(productId)
      ]);
      
      setReviews(productReviews);
      setAverageRating(ratingStats.averageRating);
      setTotalReviews(ratingStats.totalReviews);
      
      // Verificar si el usuario ya ha reseñado
      if (isAuthenticated() && user) {
        const existingUserReview = await reviewsService.getUserReview(user.id, productId);
        setUserReview(existingUserReview);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      alert('Debes iniciar sesión para escribir una reseña');
      return;
    }

    if (rating === 0) {
      alert('Por favor, selecciona una puntuación');
      return;
    }

    try {
      setSubmitting(true);
      
      const reviewData = {
        userId: user.id,
        userName: user.name || user.email,
        rating: rating,
        comment: comment.trim()
      };

      await reviewsService.addReview(productId, reviewData);
      
      // Recargar reseñas
      await loadReviews();
      
      // Limpiar formulario
      setRating(0);
      setHoverRating(0);
      setComment('');
      setShowReviewForm(false);
      
      alert('¡Reseña enviada exitosamente!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.message || 'Error al enviar la reseña. Por favor, intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, size = 'medium') => {
    const stars = [];
    const currentRating = interactive ? (hoverRating || rating) : rating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`star ${i <= currentRating ? 'filled' : 'empty'} ${size} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => setRating(i) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          disabled={!interactive}
        >
          <i className="fas fa-star"></i>
        </button>
      );
    }
    
    return <div className="stars-container">{stars}</div>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="product-reviews-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <span>Cargando reseñas...</span>
      </div>
    );
  }

  return (
    <div className="product-reviews-section">
      <div className="reviews-header">
        <h2>Valoraciones y Reseñas</h2>
        <div className="reviews-summary">
          <div className="average-rating">
            <div className="rating-display">
              <span className="rating-number">{averageRating.toFixed(1)}</span>
              {renderStars(averageRating, false, 'large')}
            </div>
            <div className="rating-info">
              <span className="total-reviews">
                {totalReviews} {totalReviews === 1 ? 'valoración' : 'valoraciones'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de reseña para usuarios autenticados */}
      {isAuthenticated() && !userReview && (
        <div className="review-form-section">
          {!showReviewForm ? (
            <button 
              className="write-review-btn"
              onClick={() => setShowReviewForm(true)}
            >
              <i className="fas fa-edit"></i>
              Escribir reseña
            </button>
          ) : (
            <form onSubmit={handleSubmitReview} className="review-form">
              <h3>Escribe tu reseña</h3>
              
              <div className="rating-input">
                <label>Tu puntuación:</label>
                {renderStars(rating, true, 'large')}
              </div>
              
              <div className="comment-input">
                <label htmlFor="review-comment">
                  Comentario (opcional):
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comparte tu experiencia con este producto..."
                  rows="4"
                  maxLength="500"
                />
                <small>{comment.length}/500 caracteres</small>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-review-btn"
                  onClick={() => {
                    setShowReviewForm(false);
                    setRating(0);
                    setHoverRating(0);
                    setComment('');
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="submit-review-btn"
                  disabled={submitting || rating === 0}
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Enviar reseña
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Mensaje para usuarios no autenticados */}
      {!isAuthenticated() && (
        <div className="auth-prompt">
          <p>
            <i className="fas fa-info-circle"></i>
            Inicia sesión para escribir una reseña
          </p>
        </div>
      )}

      {/* Lista de reseñas */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <i className="fas fa-comments"></i>
            <p>Aún no hay reseñas para este producto.</p>
            <p>¡Sé el primero en compartir tu experiencia!</p>
          </div>
        ) : (
          <>
            <h3>Todas las reseñas ({totalReviews})</h3>
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="reviewer-details">
                      <span className="reviewer-name">
                        {review.userName}
                        {review.verified && (
                          <i className="fas fa-check-circle verified" title="Compra verificada"></i>
                        )}
                      </span>
                      <span className="review-date">{formatDate(review.date)}</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating, false, 'small')}
                  </div>
                </div>
                
                {review.comment && (
                  <div className="review-comment">
                    <p>{review.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductReviews; 