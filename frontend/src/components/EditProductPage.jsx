import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCategories } from '../mockCategories';
import NotificationService from '../services/notificationService';
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
    try {
      const productToEdit = products.find(p => p.id.toString() === productId);
      if (productToEdit) {
        setOriginalProduct(productToEdit);
        setProductName(productToEdit.name || '');
        setProductDescription(productToEdit.description || '');
        
        // Manejar la categoría: puede ser un objeto o un ID
        const categoryId = productToEdit.category?.id || productToEdit.categoryId;
        setSelectedCategoryId(categoryId ? categoryId.toString() : '');
        
        // Manejo seguro de imágenes
        if (productToEdit.imageUrls && Array.isArray(productToEdit.imageUrls)) {
          setProductImages(productToEdit.imageUrls.map((url, index) => ({
            url,
            alt: `${productToEdit.name} ${index + 1}`
          })));
        } else if (productToEdit.images && Array.isArray(productToEdit.images)) {
          setProductImages(productToEdit.images);
        }
      } else {
        NotificationService.error('Producto no encontrado', 'El producto que intentas editar no existe.');
        navigate('/administracion/productos'); 
      }
    } catch (error) {
      console.error('Error loading product for edit:', error);
      NotificationService.error('Error al cargar el producto', 'Hubo un problema al cargar la información del producto.');
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
      // Mantener las imágenes originales por ahora
      imageUrls: originalProduct.imageUrls || originalProduct.images?.map(img => img.url) || [],
      images: originalProduct.images || []
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
            {productImages.length > 0 ? productImages.map((image, index) => (
              <img 
                key={index} 
                src={typeof image === 'string' ? image : image.url}
                alt={typeof image === 'string' ? `Imagen ${index + 1}` : image.alt} 
                className="image-preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
              />
            )) : (
              <p>No hay imágenes cargadas</p>
            )}
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
