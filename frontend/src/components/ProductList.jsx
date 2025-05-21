import React, { useState, useEffect } from 'react';
import { mockProducts } from '../mockProducts'; // Asegúrate que la ruta es correcta
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Función para barajar el array (Fisher-Yates shuffle)
    const shuffleArray = (array) => {
      let currentIndex = array.length, randomIndex;
      // Mientras queden elementos por barajar.
      while (currentIndex !== 0) {
        // Elige un elemento restante.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // E intercámbialo con el elemento actual.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    };

    const shuffledProducts = shuffleArray([...mockProducts]);
    const selectedProducts = shuffledProducts.slice(0, 10); // Máximo 10 productos
    setRandomProducts(selectedProducts);
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  if (!randomProducts.length) {
    return <p>Cargando productos...</p>; // O algún indicador de carga
  }

  return (
    <div className="product-list-container">
      <h2>Recomendaciones Destacadas</h2> {/* Título agregado aquí */} 
      <div className="product-list">
        {randomProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
