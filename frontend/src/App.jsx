import './App.css';
import { Routes, Route } from 'react-router-dom'; // Importar Routes y Route
import { AuthProvider } from './contexts/AuthContext'; // Importar AuthProvider
import { FavoritesProvider } from './contexts/FavoritesContext'; // Importar FavoritesProvider
import Header from './components/Header';
import MainContent from './components/MainContent';
// Footer ya está importado, solo reestructuramos su posición en el return.
// Si no está, lo siguiente lo importa correctamente:
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton'; // Importar WhatsAppButton
import AddProductPage from './components/AddProductPage'; // Importar AddProductPage
import ProductDetailPage from './components/ProductDetailPage'; // Importar ProductDetailPage
import AdminPage from './components/AdminPage'; // Importar AdminPage
import AdminProductListPage from './components/AdminProductListPage'; // Importar AdminProductListPage
import EditProductPage from './components/EditProductPage'; // Importar EditProductPage
import RegisterPage from './components/RegisterPage'; // Importar RegisterPage
import LoginPage from './components/LoginPage'; // Importar LoginPage
import AdminUserManagement from './components/AdminUserManagement'; // Importar AdminUserManagement
import AdminCharacteristics from './components/AdminCharacteristics'; // Importar AdminCharacteristics
import AddCategoryPage from './components/AddCategoryPage'; // Importar AddCategoryPage
import AdminCategoryManagement from './components/AdminCategoryManagement'; // Importar AdminCategoryManagement
import FavoritesPage from './components/FavoritesPage'; // Importar FavoritesPage
import ReservationPage from './components/ReservationPage'; // Importar ReservationPage
import ReservationHistory from './components/ReservationHistory'; // Importar ReservationHistory
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
        imageUrls: newProductData.imageUrls || ['/src/assets/placeholder_image.webp'],
        characteristicIds: newProductData.characteristicIds || []
      };
      
      const createdProduct = await api.createProduct(productToCreate);
      setProducts(prevProducts => [...prevProducts, createdProduct]);
      // No mostrar alert aquí, el componente AddProductPage maneja el mensaje de éxito
    } catch (error) {
      console.error('Error adding product:', error);
      throw error; // Re-lanzar el error para que AddProductPage lo maneje
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
      <AuthProvider>
        <FavoritesProvider>
          <Header />
          <div className="app-content-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <div>Cargando productos...</div>
          </div>
          <Footer />
        </FavoritesProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <FavoritesProvider>
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
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/administracion" element={<AdminPage />} /> 
            <Route path="/administracion/productos" element={<AdminProductListPage products={products} handleDeleteProduct={handleDeleteProduct} />} /> 
            <Route path="/admin/edit-product/:productId" element={<EditProductPage products={products} handleEditProduct={handleEditProduct} />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/characteristics" element={<AdminCharacteristics />} />
            <Route path="/admin/add-category" element={<AddCategoryPage />} />
            <Route path="/admin/categories" element={<AdminCategoryManagement />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/favorites" element={<FavoritesPage products={products} />} />
            <Route path="/reservation/:productId" element={<ReservationPage products={products} />} />
            <Route path="/reservations" element={<ReservationHistory />} />
            {/* Aquí se pueden añadir más rutas en el futuro */}        
          </Routes>
        </div>
        <Footer /> {/* Footer fuera de Routes, pero dentro del fragmento principal */}
        <WhatsAppButton /> {/* Botón flotante de WhatsApp global */}
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;

