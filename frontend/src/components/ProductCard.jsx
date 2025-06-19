import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import FavoriteButton from './FavoriteButton'; // Importar FavoriteButton
import ShareButton from './ShareButton'; // Importar ShareButton
import RatingDisplay from './RatingDisplay'; // Importar RatingDisplay
import './ProductCard.css';
import placeholderImage from '../assets/placeholder_image.webp'; // Importar la imagen local

const ProductCard = ({ product }) => {
  if (!product) {
    return null; // O algún placeholder si el producto no está definido
  }

  // Obtener la primera imagen del producto o usar placeholder
  const getProductImage = () => {
    // Si el producto tiene imageUrls y no está vacío
    if (product.imageUrls && product.imageUrls.length > 0) {
      const firstImageUrl = product.imageUrls[0];
      // Verificar que la URL no esté vacía y no sea undefined
      if (firstImageUrl && firstImageUrl.trim() !== '' && !firstImageUrl.includes('undefined')) {
        return firstImageUrl;
      }
    }
    
    // Si el producto tiene images (formato legacy)
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage && firstImage.url && firstImage.url.trim() !== '' && !firstImage.url.includes('undefined')) {
        return firstImage.url;
      }
    }
    
    // Fallback a placeholder
    return placeholderImage;
  };

  return (
    <div className="product-card-container">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card">
          <div className="product-card-image-container">
            <img 
              src={getProductImage()} 
              alt={product.name} 
              className="product-card-image"
              onError={(e) => {
                // Si falla la carga de la imagen, usar placeholder
                e.target.src = placeholderImage;
              }}
            />
            <div className="product-card-actions">
              <FavoriteButton productId={product.id} />
              <ShareButton product={product} />
            </div>
          </div>
          <div className="product-card-content">
            <h3 className="product-card-name">{product.name}</h3>
            <p className="product-card-description">{product.description}</p>
            <p className="product-card-price">{product.price}</p>
            <div className="product-card-rating">
              <RatingDisplay 
                rating={product.averageRating || 0} 
                totalReviews={product.totalReviews || 0}
                size="small"
                compact={true}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
