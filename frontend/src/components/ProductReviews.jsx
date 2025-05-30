import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
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
        api.getProductReviews(productId),
        api.getProductRatingStats(productId)
      ]);
      
      setReviews(productReviews);
      setAverageRating(ratingStats.averageRating || 0);
      setTotalReviews(ratingStats.totalReviews || 0);
      
      // Verificar si el usuario ya ha reseñado
      if (isAuthenticated() && user) {
        const existingUserReview = await api.getUserReview(user.id, productId);
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
        productId: parseInt(productId),
        rating: rating,
        comment: comment.trim()
      };

      await api.createReview(reviewData);
      
      // Recargar reseñas
      await loadReviews();
      
      // Limpiar formulario
      setRating(0);
      setComment('');
      setShowReviewForm(false);
      
      alert('¡Reseña enviada exitosamente!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error al enviar la reseña. Por favor, inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null, onStarHover = null, onStarLeave = null) => {
    const stars = [];
    const displayRating = interactive ? (hoverRating || rating) : rating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= displayRating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => onStarClick(i) : undefined}
          onMouseEnter={interactive ? () => onStarHover(i) : undefined}
          onMouseLeave={interactive ? onStarLeave : undefined}
        >
          ★
        </span>
      );
    }
    return stars;
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
      <div className="reviews-section">
        <div className="reviews-loading">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando reseñas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3>Reseñas y Puntuaciones</h3>
        
        {totalReviews > 0 && (
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{averageRating.toFixed(1)}</span>
              <div className="rating-stars">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="total-reviews">({totalReviews} reseña{totalReviews !== 1 ? 's' : ''})</span>
            </div>
          </div>
        )}
      </div>

      {/* Formulario para escribir reseña */}
      {isAuthenticated() && !userReview && (
        <div className="review-form-section">
          {!showReviewForm ? (
            <button 
              className="write-review-btn"
              onClick={() => setShowReviewForm(true)}
            >
              <i className="fas fa-edit"></i>
              Escribir una reseña
            </button>
          ) : (
            <form onSubmit={handleSubmitReview} className="review-form">
              <h4>Escribe tu reseña</h4>
              
              <div className="rating-input">
                <label>Puntuación:</label>
                <div className="stars-input">
                  {renderStars(
                    rating,
                    true,
                    setRating,
                    setHoverRating,
                    () => setHoverRating(0)
                  )}
                </div>
              </div>

              <div className="comment-input">
                <label htmlFor="comment">Comentario (opcional):</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comparte tu experiencia con este vehículo..."
                  rows="4"
                  maxLength="1000"
                />
                <small>{comment.length}/1000 caracteres</small>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowReviewForm(false);
                    setRating(0);
                    setComment('');
                    setHoverRating(0);
                  }}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={submitting || rating === 0}
                  className="submit-btn"
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Reseña'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Mostrar reseña del usuario si ya existe */}
      {userReview && (
        <div className="user-review-section">
          <h4>Tu reseña</h4>
          <div className="review-item user-review">
            <div className="review-header">
              <div className="reviewer-info">
                <span className="reviewer-name">Tú</span>
                <div className="review-rating">
                  {renderStars(userReview.rating)}
                </div>
              </div>
              <span className="review-date">{formatDate(userReview.createdAt)}</span>
            </div>
            {userReview.comment && (
              <p className="review-comment">{userReview.comment}</p>
            )}
          </div>
        </div>
      )}

      {/* Lista de reseñas */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <i className="far fa-comment"></i>
            <p>Aún no hay reseñas para este producto.</p>
            {isAuthenticated() && !userReview && (
              <p>¡Sé el primero en escribir una reseña!</p>
            )}
          </div>
        ) : (
          <>
            <h4>Todas las reseñas ({reviews.length})</h4>
            {reviews
              .filter(review => !userReview || review.id !== userReview.id)
              .map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <span className="reviewer-name">{review.userName}</span>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                      {review.verified && (
                        <span className="verified-badge">
                          <i className="fas fa-check-circle"></i>
                          Verificado
                        </span>
                      )}
                    </div>
                    <span className="review-date">{formatDate(review.createdAt)}</span>
                  </div>
                  {review.comment && (
                    <p className="review-comment">{review.comment}</p>
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