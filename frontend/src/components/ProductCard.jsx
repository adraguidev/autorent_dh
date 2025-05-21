import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import './ProductCard.css';
import placeholderImage from '../assets/placeholder_image.webp'; // Importar la imagen local

const ProductCard = ({ product }) => {
  if (!product) {
    return null; // O algún placeholder si el producto no está definido
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
      <img src={placeholderImage} alt={product.name} className="product-card-image" /> {/* Usar la imagen importada */}
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <p className="product-card-price">{product.price}</p>
        {/* Podríamos añadir un botón de 'Ver más' o 'Alquilar' aquí */}
      </div>
          </div>
    </Link>
  );
};

export default ProductCard;
