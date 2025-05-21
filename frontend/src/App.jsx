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
import { mockProducts as initialProducts } from './mockProducts'; // Importar mockProducts como initialProducts
import React, { useState } from 'react'; // Importar useState

function App() {
  const [products, setProducts] = useState(initialProducts);

  const handleDeleteProduct = (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      // Aquí, en una aplicación real, también harías una llamada a la API para eliminarlo del backend.
      // Por ahora, solo actualizamos el estado local, que simula nuestra "base de datos" mock.
      alert("Producto eliminado con éxito."); // Feedback al usuario
    }
  };
  return (
    <>
      <Header />
      <div className="app-content-wrapper"> {/* Contenedor para el contenido principal */} 
        <Routes> {/* Definir las rutas */} 
          <Route path="/" element={<MainContent products={products} />} />
          <Route path="/admin/add-product" element={<AddProductPage />} /> {/* AddProductPage podría necesitar setProducts si añade productos */}
          <Route path="/product/:productId" element={<ProductDetailPage products={products} />} /> 
          <Route path="/administracion" element={<AdminPage />} /> 
          <Route path="/administracion/productos" element={<AdminProductListPage products={products} handleDeleteProduct={handleDeleteProduct} />} /> 
          {/* Aquí se pueden añadir más rutas en el futuro */}        
        </Routes>
      </div>
      <Footer /> {/* Footer fuera de Routes, pero dentro del fragmento principal */}
    </>
  );
}

export default App;

