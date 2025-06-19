-- ================================================================
-- SCRIPT DE INICIALIZACIÓN COMPLETA DE BASE DE DATOS AUTORENT
-- ================================================================
-- Este script inicializa la base de datos con todos los datos actuales
-- Incluye: categorías, características, productos, imágenes y relaciones
-- Fecha: 2025-06-19
-- Versión: 1.0

-- Configuración inicial
SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- ================================================================
-- CATEGORÍAS
-- ================================================================
INSERT IGNORE INTO categories (id, name, description, image) VALUES
(1, 'Compacto', 'Vehículos pequeños y eficientes, perfectos para la ciudad y viajes cortos.', '/assets/categories/compacto.webp'),
(2, 'Sedán', 'Automóviles cómodos y espaciosos, ideales para familias y viajes largos.', '/assets/categories/sedan.webp'),
(3, 'SUV', 'Vehículos utilitarios deportivos con mayor altura y capacidad todoterreno.', '/assets/categories/suv.webp'),
(4, 'Lujo', 'Vehículos premium con las mejores comodidades y tecnología avanzada.', '/assets/categories/lujo.webp'),
(5, 'Van/Minivan', 'Vehículos espaciosos para grupos grandes y transporte de carga.', '/assets/categories/van.webp'),
(6, 'Deportivo', 'Vehículos de alto rendimiento diseñados para la velocidad y la emoción.', '/assets/categories/deportivo.webp');

-- ================================================================
-- CARACTERÍSTICAS
-- ================================================================
INSERT IGNORE INTO characteristics (id, name, icon) VALUES
(1, 'Aire Acondicionado', 'fas fa-snowflake'),
(2, 'GPS', 'fas fa-map-marked-alt'),
(3, 'Bluetooth', 'fab fa-bluetooth'),
(4, 'Transmisión Automática', 'fas fa-cogs'),
(5, 'WiFi', 'fas fa-wifi'),
(6, 'USB', 'fab fa-usb'),
(7, 'Asientos de Cuero', 'fas fa-couch'),
(8, 'Radio Satelital', 'fas fa-satellite'),
(9, 'Cámara de Reversa', 'fas fa-video'),
(10, 'Control de Crucero', 'fas fa-tachometer-alt');

-- ================================================================
-- PRODUCTOS
-- ================================================================
INSERT IGNORE INTO products (id, name, description, price, category_id) VALUES
(1, 'Vehículo Compacto Económicos', 'Ideal para la ciudad, bajo consumo y fácil de estacionar.', '$25/día', 1),
(2, 'Sedán Familiar Confortable', 'Espacioso y seguro, perfecto para viajes largos en familia.', '$40/día', 2),
(3, 'SUV Todoterreno Aventurero', 'Robusto y versátil para cualquier tipo de terreno y aventura.', '$60/día', 3),
(4, 'Auto de Lujo Premium', 'Experiencia de conducción superior con máximo confort y tecnología.', '$100/día', 4),
(5, 'Van Espaciosa para Grupos', 'Ideal para grupos grandes o familias numerosas, con mucho espacio.', '$70/día', 5),
(6, 'Deportivo Alta Gama', 'Velocidad y diseño se unen en este increíble deportivo.', '$150/día', 6),
(7, 'Sedán de Lujo Ejecutivo', 'Perfecto para viajes de negocios, combina elegancia y rendimiento.', '$85/día', 4),
(8, 'Compacto Deportivo Ágil', 'Diversión y agilidad en un paquete compacto y deportivo.', '$35/día', 1);

-- ================================================================
-- IMÁGENES DE PRODUCTOS
-- ================================================================
INSERT IGNORE INTO product_images (product_id, image_url) VALUES
-- Producto 1: Compacto Económico
(1, 'https://images.pexels.com/photos/7290407/pexels-photo-7290407.jpeg'),
(1, 'https://images.pexels.com/photos/7808349/pexels-photo-7808349.jpeg'),
(1, 'https://images.pexels.com/photos/17450510/pexels-photo-17450510.jpeg'),

-- Producto 2: Sedán Familiar
(2, 'https://images.pexels.com/photos/3541743/pexels-photo-3541743.jpeg'),
(2, 'https://images.pexels.com/photos/3727937/pexels-photo-3727937.jpeg'),

-- Producto 3: SUV Todoterreno
(3, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'),
(3, 'https://images.pexels.com/photos/32536589/pexels-photo-32536589.jpeg'),
(3, 'https://images.pexels.com/photos/19410457/pexels-photo-19410457.jpeg'),

-- Producto 4: Auto de Lujo
(4, 'https://images.pexels.com/photos/32609663/pexels-photo-32609663.jpeg'),
(4, 'https://images.pexels.com/photos/32609622/pexels-photo-32609622.jpeg'),
(4, 'https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg'),
(4, 'https://images.pexels.com/photos/32609602/pexels-photo-32609602.jpeg'),

-- Producto 5: Van Espaciosa
(5, 'https://images.pexels.com/photos/21012245/pexels-photo-21012245.jpeg'),
(5, 'https://images.pexels.com/photos/16510657/pexels-photo-16510657.jpeg'),
(5, 'https://images.pexels.com/photos/12175736/pexels-photo-12175736.jpeg'),

-- Producto 6: Deportivo Alta Gama
(6, 'https://images.pexels.com/photos/10394783/pexels-photo-10394783.jpeg'),
(6, 'https://images.pexels.com/photos/10804351/pexels-photo-10804351.jpeg'),
(6, 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'),

-- Producto 7: Sedán de Lujo Ejecutivo
(7, 'https://images.pexels.com/photos/18860536/pexels-photo-18860536.jpeg'),
(7, 'https://images.pexels.com/photos/26691371/pexels-photo-26691371.jpeg'),
(7, 'https://images.pexels.com/photos/12152812/pexels-photo-12152812.jpeg'),

-- Producto 8: Compacto Deportivo
(8, 'https://images.pexels.com/photos/27524717/pexels-photo-27524717.jpeg');

-- ================================================================
-- RELACIONES PRODUCTO-CARACTERÍSTICAS
-- ================================================================
INSERT IGNORE INTO product_characteristics (product_id, characteristic_id) VALUES
-- Producto 1: Compacto Económico (básicas)
(1, 1), -- Aire Acondicionado
(1, 4), -- Transmisión Automática
(1, 9), -- Cámara de Reversa

-- Producto 2: Sedán Familiar (familiares)
(2, 1), -- Aire Acondicionado
(2, 2), -- GPS
(2, 3), -- Bluetooth
(2, 4), -- Transmisión Automática
(2, 6), -- USB
(2, 9), -- Cámara de Reversa

-- Producto 3: SUV Todoterreno (aventurero)
(3, 1), -- Aire Acondicionado
(3, 2), -- GPS
(3, 3), -- Bluetooth
(3, 4), -- Transmisión Automática
(3, 6), -- USB
(3, 9), -- Cámara de Reversa
(3, 10), -- Control de Crucero

-- Producto 4: Auto de Lujo (completo)
(4, 1), -- Aire Acondicionado
(4, 2), -- GPS
(4, 3), -- Bluetooth
(4, 4), -- Transmisión Automática
(4, 5), -- WiFi
(4, 6), -- USB
(4, 7), -- Asientos de Cuero
(4, 8), -- Radio Satelital
(4, 9), -- Cámara de Reversa
(4, 10), -- Control de Crucero

-- Producto 5: Van Espaciosa (grupal)
(5, 1), -- Aire Acondicionado
(5, 2), -- GPS
(5, 3), -- Bluetooth
(5, 4), -- Transmisión Automática
(5, 6), -- USB
(5, 9), -- Cámara de Reversa

-- Producto 6: Deportivo Alta Gama (premium deportivo)
(6, 1), -- Aire Acondicionado
(6, 2), -- GPS
(6, 3), -- Bluetooth
(6, 5), -- WiFi
(6, 6), -- USB
(6, 7), -- Asientos de Cuero
(6, 8), -- Radio Satelital
(6, 9), -- Cámara de Reversa
(6, 10), -- Control de Crucero

-- Producto 7: Sedán de Lujo Ejecutivo (lujo ejecutivo)
(7, 1), -- Aire Acondicionado
(7, 2), -- GPS
(7, 3), -- Bluetooth
(7, 4), -- Transmisión Automática
(7, 5), -- WiFi
(7, 6), -- USB
(7, 7), -- Asientos de Cuero
(7, 8), -- Radio Satelital
(7, 9), -- Cámara de Reversa
(7, 10), -- Control de Crucero

-- Producto 8: Compacto Deportivo (deportivo básico)
(8, 1), -- Aire Acondicionado
(8, 3), -- Bluetooth
(8, 4), -- Transmisión Automática
(8, 6), -- USB
(8, 9); -- Cámara de Reversa

-- ================================================================
-- CONFIGURACIÓN FINAL
-- ================================================================
SET FOREIGN_KEY_CHECKS = 1;

-- Mensaje de confirmación
SELECT '✅ Base de datos AutoRent inicializada correctamente' as mensaje,
       (SELECT COUNT(*) FROM categories) as categorias,
       (SELECT COUNT(*) FROM characteristics) as caracteristicas,
       (SELECT COUNT(*) FROM products) as productos,
       (SELECT COUNT(*) FROM product_images) as imagenes,
       (SELECT COUNT(*) FROM product_characteristics) as relaciones; 