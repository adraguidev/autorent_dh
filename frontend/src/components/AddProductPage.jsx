import React, { useState } from 'react';
import { mockCategories } from '../mockCategories'; // Importar categorías
import './AddProductPage.css';

const AddProductPage = ({ handleAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(''); // Estado para la categoría seleccionada

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
      categoryId: selectedCategoryId, // Incluir categoryId
      images: productImages 
    });
    // Aquí se conectaría con el backend más adelante

    if (handleAddProduct) {
      handleAddProduct({ 
        name: productName, 
        description: productDescription, 
        categoryId: selectedCategoryId,
        images: productImages // Aunque handleAddProduct en App.jsx no usa las File objects directamente aun
      });

      // Limpiar formulario
      setProductName('');
      setProductDescription('');
      setProductImages([]);
      setSelectedCategoryId('');
      // Opcional: Redirigir o mostrar mensaje de éxito más prominente
    } else {
      console.error('handleAddProduct no fue proporcionado a AddProductPage');
    }
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
          <label htmlFor="productCategory">Categoría:</label>
          <select 
            id="productCategory" 
            value={selectedCategoryId} 
            onChange={(e) => setSelectedCategoryId(e.target.value)} 
            required
          >
            <option value="" disabled>Seleccione una categoría</option>
            {mockCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
