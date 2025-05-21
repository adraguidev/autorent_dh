import React, { useState } from 'react';
import './AddProductPage.css';

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState([]);

  const handleImageChange = (e) => {
    // Lógica para manejar múltiples imágenes (simplificada por ahora)
    if (e.target.files.length) {
      setProductImages(prevImages => [...prevImages, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el producto (nombre, descripción, imágenes)
    // Por ahora, solo mostraremos en consola
    console.log('Producto a agregar:', { 
      name: productName, 
      description: productDescription, 
      images: productImages 
    });
    // Aquí se conectaría con el backend más adelante
  };

  return (
    <div className="add-product-page">
      <h1>Agregar Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="productName">Nombre del Producto:</label>
          <input 
            type="text" 
            id="productName" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Descripción:</label>
          <textarea 
            id="productDescription" 
            value={productDescription} 
            onChange={(e) => setProductDescription(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="productImages">Imágenes del Producto:</label>
          <input 
            type="file" 
            id="productImages" 
            multiple 
            onChange={handleImageChange} 
          />
          <div className="image-preview-container">
            {productImages.length > 0 && productImages.map((image, index) => (
              <img 
                key={index} 
                src={URL.createObjectURL(image)} 
                alt={`preview ${index}`} 
                className="image-preview"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="submit-product-btn">Guardar Producto</button>
      </form>
    </div>
  );
};

export default AddProductPage;
