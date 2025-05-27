import './App.css';
import { Routes, Route } from 'react-router-dom'; // Importar Routes y Route
import Header from './components/Header';
import MainContent from './components/MainContent';
// Footer ya está importado, solo reestructuramos su posición en el return.
// Si no está, lo siguiente lo importa correctamente:
import Footer from './components/Footer';
import AddProductPage from './components/AddProductPage'; // Importar AddProductPage
import ProductDetailPage from './components/ProductDetailPage'; // Importar ProductDetailPage
import AdminPage from './components/AdminPage'; // Importar AdminPage
import AdminProductListPage from './components/AdminProductListPage'; // Importar AdminProductListPage
import EditProductPage from './components/EditProductPage'; // Importar EditProductPage
import RegisterPage from './components/RegisterPage'; // Importar RegisterPage
import LoginPage from './components/LoginPage'; // Importar LoginPage
import { mockProducts as initialProducts } from './mockProducts'; // Importar mockProducts como initialProducts
import { api } from './services/api'; // Importar el servicio API
import React, { useState, useEffect } from 'react'; // Importar useState y useEffect

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos del backend al iniciar la aplicación
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsFromAPI = await api.getProducts();
        setProducts(productsFromAPI);
        setError(null);
      } catch (err) {
        console.error('Error loading products from API, falling back to mock data:', err);
        setProducts(initialProducts); // Fallback a datos mock si falla la API
        setError('No se pudo conectar al servidor. Usando datos de prueba.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddProduct = async (newProductData) => {
    try {
      const productToCreate = {
        name: newProductData.name,
        description: newProductData.description,
        price: newProductData.price || '$TBD/día',
        categoryId: parseInt(newProductData.categoryId),
        imageUrls: ['/src/assets/placeholder_image.webp'] // Placeholder images
      };
      
      const createdProduct = await api.createProduct(productToCreate);
      setProducts(prevProducts => [...prevProducts, createdProduct]);
      alert("Producto agregado con éxito.");
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Error al agregar el producto. Por favor, intenta de nuevo.");
    }
  };

  const handleEditProduct = (productId, updatedData) => {
    setProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === productId ? { ...p, ...updatedData } : p
      )
    );
    alert('Producto actualizado con éxito.');
    // La navegación ya la hace EditProductPage
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await api.deleteProduct(productId);
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        alert("Producto eliminado con éxito.");
      } catch (error) {
        console.error('Error deleting product:', error);
        alert("Error al eliminar el producto. Por favor, intenta de nuevo.");
      }
    }
  };
  if (loading) {
    return (
      <>
        <Header />
        <div className="app-content-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div>Cargando productos...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {error && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          color: '#856404', 
          padding: '10px', 
          margin: '10px', 
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      <div className="app-content-wrapper"> {/* Contenedor para el contenido principal */} 
        <Routes> {/* Definir las rutas */} 
          <Route path="/" element={<MainContent products={products} />} />
          <Route path="/admin/add-product" element={<AddProductPage handleAddProduct={handleAddProduct} />} /> {/* AddProductPage podría necesitar setProducts si añade productos */}
          <Route path="/product/:productId" element={<ProductDetailPage products={products} />} /> 
          <Route path="/administracion" element={<AdminPage />} /> 
          <Route path="/administracion/productos" element={<AdminProductListPage products={products} handleDeleteProduct={handleDeleteProduct} />} /> 
          <Route path="/admin/edit-product/:productId" element={<EditProductPage products={products} handleEditProduct={handleEditProduct} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Aquí se pueden añadir más rutas en el futuro */}        
        </Routes>
      </div>
      <Footer /> {/* Footer fuera de Routes, pero dentro del fragmento principal */}
    </>
  );
}

export default App;

