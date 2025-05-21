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

function App() {
  return (
    <>
      <Header />
      <div className="app-content-wrapper"> {/* Contenedor para el contenido principal */} 
        <Routes> {/* Definir las rutas */} 
          <Route path="/" element={<MainContent />} />
          <Route path="/admin/add-product" element={<AddProductPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} /> {/* Ruta para detalle de producto */}
          <Route path="/administracion" element={<AdminPage />} /> {/* Ruta para el panel de administración */}
          {/* Aquí se pueden añadir más rutas en el futuro */}
        </Routes>
      </div>
      <Footer /> {/* Footer fuera de Routes, pero dentro del fragmento principal */}
    </>
  );
}

export default App;

