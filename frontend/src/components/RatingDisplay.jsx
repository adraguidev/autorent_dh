import React from 'react';
import './RatingDisplay.css';

const RatingDisplay = ({ 
  rating = 0, 
  totalReviews = 0, 
  size = 'small', 
  showReviewCount = true,
  compact = false 
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Estrella completa
        stars.push(
          <i key={i} className="fas fa-star star-filled"></i>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Media estrella
        stars.push(
          <i key={i} className="fas fa-star-half-alt star-half"></i>
        );
      } else {
        // Estrella vacía
        stars.push(
          <i key={i} className="far fa-star star-empty"></i>
        );
      }
    }
    
    return stars;
  };

  if (totalReviews === 0) {
    return (
      <div className={`rating-display no-rating ${size} ${compact ? 'compact' : ''}`}>
        <div className="stars-container">
          {[1, 2, 3, 4, 5].map(i => (
            <i key={i} className="far fa-star star-empty"></i>
          ))}
        </div>
        {showReviewCount && !compact && (
          <span className="review-count">Sin valoraciones</span>
        )}
      </div>
    );
  }

  return (
    <div className={`rating-display ${size} ${compact ? 'compact' : ''}`}>
      <div className="stars-container">
        {renderStars()}
      </div>
      
      {!compact && (
        <div className="rating-info">
          <span className="rating-value">{rating.toFixed(1)}</span>
          {showReviewCount && (
            <span className="review-count">
              ({totalReviews} {totalReviews === 1 ? 'valoración' : 'valoraciones'})
            </span>
          )}
        </div>
      )}
      
      {compact && showReviewCount && (
        <span className="rating-compact">
          {rating.toFixed(1)} ({totalReviews})
        </span>
      )}
    </div>
  );
};

export default RatingDisplay; 