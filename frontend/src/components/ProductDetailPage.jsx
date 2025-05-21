import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../mockProducts'; // Ajusta la ruta si es necesario
import placeholderImage from '../assets/placeholder_image.webp'; // Usaremos la misma imagen para todas por ahora
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams(); // Obtiene el ID del producto de la URL
  const product = mockProducts.find(p => p.id.toString() === productId);

  if (!product) {
    return <div className="product-detail-page"><p>Producto no encontrado.</p></div>;
  }

  // Por ahora, asumimos una sola imagen principal (la placeholder)
  // Si tuvieras un array de imágenes en product.images, podrías mapearlas aquí.
  const mainImage = placeholderImage; 

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <div className="product-detail-header-content">
          <h1 className="product-detail-title">{product.name}</h1>
          <Link to="/" className="back-arrow">← Volver</Link> {/* Cambia "/" si la lista de productos está en otra ruta */}
        </div>
      </div>

      <div className="product-detail-body">
        <div className="product-detail-images">
          {/* Imagen Principal */}
          <img src={mainImage} alt={product.name} className="product-detail-main-image" />
          
          {/* Galería de imágenes adicionales (si las hubiera) */}
          {/* 
          {product.images && product.images.length > 1 && (
            <div className="product-detail-thumbnail-gallery">
              {product.images.map((img, index) => (
                <img key={index} src={img.url} alt={`${product.name} thumbnail ${index + 1}`} className="product-detail-thumbnail" />
              ))}
            </div>
          )}
          */}
        </div>

        <div className="product-detail-info">
          <h2>Descripción</h2>
          <p className="product-detail-description">{product.description}</p>
          
          {/* Otros detalles del producto podrían ir aquí */}
          <p className="product-detail-price">Precio: {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
