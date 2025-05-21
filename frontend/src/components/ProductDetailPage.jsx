import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../mockProducts'; // Ajusta la ruta si es necesario
import placeholderImage from '../assets/placeholder_image.webp'; // Usaremos la misma imagen para todas por ahora
import ImageGalleryModal from './ImageGalleryModal'; // Importar el nuevo modal
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams(); // Obtiene el ID del producto de la URL
  const product = mockProducts.find(p => p.id.toString() === productId);

  if (!product) {
    return <div className="product-detail-page"><p>Producto no encontrado.</p></div>;
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

  // Si no hay imágenes, podríamos mostrar un placeholder genérico o un mensaje
  // Por ahora, se asume que placeholderImage está disponible para todas.

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <div className="product-detail-header-content">
          <h1 className="product-detail-title">{product.name}</h1>
          <Link to="/" className="back-arrow">← Volver</Link>
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

      {/* Información del producto (descripción, precio, etc.) va después de la galería */}
      <div className="product-detail-body">        
        <div className="product-detail-info">
          <h2>Descripción</h2>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">Precio: {product.price}</p>
        </div>
      </div>

      {isModalOpen && (
        <ImageGalleryModal 
          images={images} // Pasar todas las imágenes del producto
          initialImageIndex={selectedImageIndex}
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
