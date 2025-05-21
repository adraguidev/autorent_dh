import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCategories } from '../mockCategories';
import './AddProductPage.css'; // Reutilizaremos algunos estilos por ahora

const EditProductPage = ({ products, handleEditProduct }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [productImages, setProductImages] = useState([]); // Manejo de imágenes simplificado
  const [originalProduct, setOriginalProduct] = useState(null);

  useEffect(() => {
    const productToEdit = products.find(p => p.id.toString() === productId);
    if (productToEdit) {
      setOriginalProduct(productToEdit);
      setProductName(productToEdit.name);
      setProductDescription(productToEdit.description);
      setSelectedCategoryId(productToEdit.categoryId.toString());
      // setProductImages(productToEdit.images); // El manejo de imágenes existentes es más complejo
    } else {
      // Si el producto no se encuentra, redirigir o mostrar error
      navigate('/administracion/productos'); 
    }
  }, [productId, products, navigate]);

  const handleImageChange = (e) => {
    // Lógica para manejar carga de NUEVAS imágenes (simplificada)
    if (e.target.files.length) {
      setProductImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalProduct) return;

    const updatedProductData = {
      name: productName,
      description: productDescription,
      categoryId: parseInt(selectedCategoryId),
      // El manejo de imágenes es complejo: decidir si reemplazar, añadir, etc.
      // Por ahora, no actualizaremos imágenes aquí para simplificar.
      images: originalProduct.images // Mantenemos las imágenes originales por ahora
    };

    handleEditProduct(originalProduct.id, updatedProductData);
    // alert('Producto actualizado con éxito'); // El feedback se puede manejar en App.jsx o aquí
    navigate('/administracion/productos'); // Volver a la lista de productos
  };

  if (!originalProduct) {
    return <p>Cargando producto...</p>; // O un spinner de carga
  }

  return (
    <div className="add-product-page"> {/* Reutilizando clase de estilo */} 
      <h1>Editar Producto: {originalProduct.name}</h1>
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
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sección de imágenes simplificada para edición */}
        <div className="form-group">
          <label>Imágenes Actuales:</label>
          <div className="image-preview-container">
            {originalProduct.images.map((image, index) => (
              <img 
                key={index} 
                src={image.url} // Asumiendo que la URL es directa
                alt={image.alt} 
                className="image-preview"
              />
            ))}
          </div>
          <label htmlFor="productImages">Cargar Nuevas Imágenes (reemplazarán las actuales):</label>
          <input 
            type="file" 
            id="productImages" 
            multiple 
            onChange={handleImageChange} 
          />
        </div>

        <button type="submit" className="submit-product-btn">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProductPage;
