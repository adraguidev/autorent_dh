// src/mockProducts.js
// Nota: La URL de la imagen es manejada por la importación directa en ProductCard.jsx para la vista de lista.
// Para la galería en ProductDetailPage, usaremos la ruta simbólica y la importación de placeholderImage.
export const mockProducts = [
  // Estructura de ejemplo para un producto:
  // {
  //   id: 1,
  //   name: 'Nombre del Producto',
  //   description: 'Descripción...',
  //   price: '$XX/día',
  //   images: [
  //     { id: 'prod1_img1', url: '/src/assets/placeholder_image.webp', alt: 'Nombre del Producto - Vista 1' },
  //     { id: 'prod1_img2', url: '/src/assets/placeholder_image.webp', alt: 'Nombre del Producto - Vista 2' },
  //     { id: 'prod1_img3', url: '/src/assets/placeholder_image.webp', alt: 'Nombre del Producto - Vista 3' },
  //     { id: 'prod1_img4', url: '/src/assets/placeholder_image.webp', alt: 'Nombre del Producto - Vista 4' },
  //     { id: 'prod1_img5', url: '/src/assets/placeholder_image.webp', alt: 'Nombre del Producto - Vista 5' }
  //   ]
  // }

  {
    id: 1,
    name: 'Vehículo Compacto Económico',
    description: 'Ideal para la ciudad, bajo consumo y fácil de estacionar.',
    price: '$25/día',
    images: [
      { id: '1_img1', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Compacto Económico - Vista 1' },
      { id: '1_img2', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Compacto Económico - Vista 2' },
      { id: '1_img3', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Compacto Económico - Vista 3' },
      { id: '1_img4', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Compacto Económico - Vista 4' },
      { id: '1_img5', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Compacto Económico - Vista 5' }
    ]
  },
  {
    id: 2,
    name: 'Sedán Familiar Confortable',
    description: 'Espacioso y seguro, perfecto para viajes largos en familia.',
    price: '$40/día',
    images: [
      { id: '2_img1', url: '/src/assets/placeholder_image.webp', alt: 'Sedán Familiar Confortable - Vista 1' },
      { id: '2_img2', url: '/src/assets/placeholder_image.webp', alt: 'Sedán Familiar Confortable - Vista 2' },
      { id: '2_img3', url: '/src/assets/placeholder_image.webp', alt: 'Sedán Familiar Confortable - Vista 3' },
      { id: '2_img4', url: '/src/assets/placeholder_image.webp', alt: 'Sedán Familiar Confortable - Vista 4' },
      { id: '2_img5', url: '/src/assets/placeholder_image.webp', alt: 'Sedán Familiar Confortable - Vista 5' }
    ]
  },
  {
    id: 3,
    name: 'SUV Todoterreno Aventurero',
    description: 'Potencia y versatilidad para explorar cualquier camino.',
    price: '$60/día',
    images: [
      { id: '3_img1', url: '/src/assets/placeholder_image.webp', alt: 'SUV Todoterreno Aventurero - Vista 1' },
      { id: '3_img2', url: '/src/assets/placeholder_image.webp', alt: 'SUV Todoterreno Aventurero - Vista 2' },
      { id: '3_img3', url: '/src/assets/placeholder_image.webp', alt: 'SUV Todoterreno Aventurero - Vista 3' },
      { id: '3_img4', url: '/src/assets/placeholder_image.webp', alt: 'SUV Todoterreno Aventurero - Vista 4' },
      { id: '3_img5', url: '/src/assets/placeholder_image.webp', alt: 'SUV Todoterreno Aventurero - Vista 5' }
    ]
  },
  {
    id: 4,
    name: 'Deportivo Descapotable Lujoso',
    description: 'Siente la velocidad y el estilo con este impresionante deportivo.',
    price: '$90/día',
    images: [
      { id: '4_img1', url: '/src/assets/placeholder_image.webp', alt: 'Deportivo Descapotable Lujoso - Vista 1' },
      { id: '4_img2', url: '/src/assets/placeholder_image.webp', alt: 'Deportivo Descapotable Lujoso - Vista 2' },
      { id: '4_img3', url: '/src/assets/placeholder_image.webp', alt: 'Deportivo Descapotable Lujoso - Vista 3' },
      { id: '4_img4', url: '/src/assets/placeholder_image.webp', alt: 'Deportivo Descapotable Lujoso - Vista 4' },
      { id: '4_img5', url: '/src/assets/placeholder_image.webp', alt: 'Deportivo Descapotable Lujoso - Vista 5' }
    ]
  },
  {
    id: 5,
    name: 'Furgoneta de Carga Espaciosa',
    description: 'Gran capacidad para mudanzas o transporte de mercancías.',
    price: '$50/día',
    images: [
      { id: '5_img1', url: '/src/assets/placeholder_image.webp', alt: 'Furgoneta de Carga Espaciosa - Vista 1' },
      { id: '5_img2', url: '/src/assets/placeholder_image.webp', alt: 'Furgoneta de Carga Espaciosa - Vista 2' },
      { id: '5_img3', url: '/src/assets/placeholder_image.webp', alt: 'Furgoneta de Carga Espaciosa - Vista 3' },
      { id: '5_img4', url: '/src/assets/placeholder_image.webp', alt: 'Furgoneta de Carga Espaciosa - Vista 4' },
      { id: '5_img5', url: '/src/assets/placeholder_image.webp', alt: 'Furgoneta de Carga Espaciosa - Vista 5' }
    ]
  },
  {
    id: 6,
    name: 'Minivan 7 Plazas Viajera',
    description: 'Comodidad para grupos grandes, ideal para vacaciones.',
    price: '$70/día',
    images: [
      { id: '6_img1', url: '/src/assets/placeholder_image.webp', alt: 'Minivan 7 Plazas Viajera - Vista 1' },
      { id: '6_img2', url: '/src/assets/placeholder_image.webp', alt: 'Minivan 7 Plazas Viajera - Vista 2' },
      { id: '6_img3', url: '/src/assets/placeholder_image.webp', alt: 'Minivan 7 Plazas Viajera - Vista 3' },
      { id: '6_img4', url: '/src/assets/placeholder_image.webp', alt: 'Minivan 7 Plazas Viajera - Vista 4' },
      { id: '6_img5', url: '/src/assets/placeholder_image.webp', alt: 'Minivan 7 Plazas Viajera - Vista 5' }
    ]
  },
  {
    id: 7,
    name: 'Vehículo Eléctrico Ecológico',
    description: 'Conducción silenciosa y amigable con el medio ambiente.',
    price: '$55/día',
    images: [
      { id: '7_img1', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Eléctrico Ecológico - Vista 1' },
      { id: '7_img2', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Eléctrico Ecológico - Vista 2' },
      { id: '7_img3', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Eléctrico Ecológico - Vista 3' },
      { id: '7_img4', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Eléctrico Ecológico - Vista 4' },
      { id: '7_img5', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo Eléctrico Ecológico - Vista 5' }
    ]
  },
  {
    id: 8,
    name: 'Moto Scooter Urbana Ágil',
    description: 'La forma más rápida y divertida de moverte por la ciudad.',
    price: '$15/día',
    images: [
      { id: '8_img1', url: '/src/assets/placeholder_image.webp', alt: 'Moto Scooter Urbana Ágil - Vista 1' },
      { id: '8_img2', url: '/src/assets/placeholder_image.webp', alt: 'Moto Scooter Urbana Ágil - Vista 2' },
      { id: '8_img3', url: '/src/assets/placeholder_image.webp', alt: 'Moto Scooter Urbana Ágil - Vista 3' },
      { id: '8_img4', url: '/src/assets/placeholder_image.webp', alt: 'Moto Scooter Urbana Ágil - Vista 4' },
      { id: '8_img5', url: '/src/assets/placeholder_image.webp', alt: 'Moto Scooter Urbana Ágil - Vista 5' }
    ]
  },
  {
    id: 9,
    name: 'Coche Clásico Elegante',
    description: 'Un toque de distinción para eventos especiales o bodas.',
    price: '$120/día',
    images: [
      { id: '9_img1', url: '/src/assets/placeholder_image.webp', alt: 'Coche Clásico Elegante - Vista 1' },
      { id: '9_img2', url: '/src/assets/placeholder_image.webp', alt: 'Coche Clásico Elegante - Vista 2' },
      { id: '9_img3', url: '/src/assets/placeholder_image.webp', alt: 'Coche Clásico Elegante - Vista 3' },
      { id: '9_img4', url: '/src/assets/placeholder_image.webp', alt: 'Coche Clásico Elegante - Vista 4' },
      { id: '9_img5', url: '/src/assets/placeholder_image.webp', alt: 'Coche Clásico Elegante - Vista 5' }
    ]
  },
  {
    id: 10,
    name: 'Bicicleta de Montaña Robusta',
    description: 'Para los amantes de la naturaleza y las rutas de montaña.',
    price: '$10/día',
    images: [
      { id: '10_img1', url: '/src/assets/placeholder_image.webp', alt: 'Bicicleta de Montaña Robusta - Vista 1' },
      { id: '10_img2', url: '/src/assets/placeholder_image.webp', alt: 'Bicicleta de Montaña Robusta - Vista 2' },
      { id: '10_img3', url: '/src/assets/placeholder_image.webp', alt: 'Bicicleta de Montaña Robusta - Vista 3' },
      { id: '10_img4', url: '/src/assets/placeholder_image.webp', alt: 'Bicicleta de Montaña Robusta - Vista 4' },
      { id: '10_img5', url: '/src/assets/placeholder_image.webp', alt: 'Bicicleta de Montaña Robusta - Vista 5' }
    ]
  },
  {
    id: 11,
    name: 'Vehículo de Lujo Premium',
    description: 'Máximo confort, tecnología y prestaciones de alta gama.',
    price: '$150/día',
    images: [
      { id: '11_img1', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo de Lujo Premium - Vista 1' },
      { id: '11_img2', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo de Lujo Premium - Vista 2' },
      { id: '11_img3', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo de Lujo Premium - Vista 3' },
      { id: '11_img4', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo de Lujo Premium - Vista 4' },
      { id: '11_img5', url: '/src/assets/placeholder_image.webp', alt: 'Vehículo de Lujo Premium - Vista 5' }
    ]
  },
  {
    id: 12,
    name: 'Autocaravana Equipada Completa',
    description: 'Tu casa sobre ruedas para una aventura sin límites.',
    price: '$100/día',
    images: [
      { id: '12_img1', url: '/src/assets/placeholder_image.webp', alt: 'Autocaravana Equipada Completa - Vista 1' },
      { id: '12_img2', url: '/src/assets/placeholder_image.webp', alt: 'Autocaravana Equipada Completa - Vista 2' },
      { id: '12_img3', url: '/src/assets/placeholder_image.webp', alt: 'Autocaravana Equipada Completa - Vista 3' },
      { id: '12_img4', url: '/src/assets/placeholder_image.webp', alt: 'Autocaravana Equipada Completa - Vista 4' },
      { id: '12_img5', url: '/src/assets/placeholder_image.webp', alt: 'Autocaravana Equipada Completa - Vista 5' }
    ]
  },
  {
    id: 13,
    name: 'Camioneta Pickup Fuerte',
    description: 'Ideal para carga pesada y terrenos difíciles.',
    price: '$75/día',
    images: [
      { id: '13_img1', url: '/src/assets/placeholder_image.webp', alt: 'Camioneta Pickup Fuerte - Vista 1' },
      { id: '13_img2', url: '/src/assets/placeholder_image.webp', alt: 'Camioneta Pickup Fuerte - Vista 2' },
      { id: '13_img3', url: '/src/assets/placeholder_image.webp', alt: 'Camioneta Pickup Fuerte - Vista 3' },
      { id: '13_img4', url: '/src/assets/placeholder_image.webp', alt: 'Camioneta Pickup Fuerte - Vista 4' },
      { id: '13_img5', url: '/src/assets/placeholder_image.webp', alt: 'Camioneta Pickup Fuerte - Vista 5' }
    ]
  },
  {
    id: 14,
    name: 'Quad ATV Diversión Off-Road',
    description: 'Emoción y adrenalina en rutas de tierra y arena.',
    price: '$45/día',
    images: [
      { id: '14_img1', url: '/src/assets/placeholder_image.webp', alt: 'Quad ATV Diversión Off-Road - Vista 1' },
      { id: '14_img2', url: '/src/assets/placeholder_image.webp', alt: 'Quad ATV Diversión Off-Road - Vista 2' },
      { id: '14_img3', url: '/src/assets/placeholder_image.webp', alt: 'Quad ATV Diversión Off-Road - Vista 3' },
      { id: '14_img4', url: '/src/assets/placeholder_image.webp', alt: 'Quad ATV Diversión Off-Road - Vista 4' },
      { id: '14_img5', url: '/src/assets/placeholder_image.webp', alt: 'Quad ATV Diversión Off-Road - Vista 5' }
    ]
  },
  {
    id: 15,
    name: 'Coche Urbano Pequeño y Práctico',
    description: 'Perfecto para estudiantes o presupuestos ajustados.',
    price: '$20/día',
    images: [
      { id: '15_img1', url: '/src/assets/placeholder_image.webp', alt: 'Coche Urbano Pequeño y Práctico - Vista 1' },
      { id: '15_img2', url: '/src/assets/placeholder_image.webp', alt: 'Coche Urbano Pequeño y Práctico - Vista 2' },
      { id: '15_img3', url: '/src/assets/placeholder_image.webp', alt: 'Coche Urbano Pequeño y Práctico - Vista 3' },
      { id: '15_img4', url: '/src/assets/placeholder_image.webp', alt: 'Coche Urbano Pequeño y Práctico - Vista 4' },
      { id: '15_img5', url: '/src/assets/placeholder_image.webp', alt: 'Coche Urbano Pequeño y Práctico - Vista 5' }
    ]
  }
];
