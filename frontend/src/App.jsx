import './App.css';
import { Routes, Route } from 'react-router-dom'; // Importar Routes y Route
import Header from './components/Header';
import MainContent from './components/MainContent';
import AddProductPage from './components/AddProductPage'; // Importar AddProductPage
import ProductDetailPage from './components/ProductDetailPage'; // Importar ProductDetailPage

function App() {
  return (
    <>
      <Header />
      <Routes> {/* Definir las rutas */} 
        <Route path="/" element={<MainContent />} />
        <Route path="/admin/add-product" element={<AddProductPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} /> {/* Ruta para detalle de producto */}
        {/* Aquí se pueden añadir más rutas en el futuro */}
      </Routes>
    </>
  );
}

export default App;

