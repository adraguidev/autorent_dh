-- ================================================================
-- 12. RESEÑAS Y PUNTUACIONES
-- ================================================================

INSERT INTO reviews (user_id, product_id, rating, comment, created_at, verified) VALUES 
-- Reseñas para Vehículo Compacto Económico (product_id = 1)
(2, 1, 4, 'Muy buen vehículo para la ciudad. Consumo excelente y muy fácil de manejar.', CURRENT_TIMESTAMP, true),
(3, 1, 5, 'Perfecto para mis necesidades diarias. Lo recomiendo completamente.', CURRENT_TIMESTAMP, true),
(4, 1, 4, 'Económico y eficiente, justo lo que necesitaba.', CURRENT_TIMESTAMP, true),

-- Reseñas para Sedán Familiar Confortable (product_id = 2)
(3, 2, 5, 'Excelente para viajes familiares. Muy cómodo y espacioso.', CURRENT_TIMESTAMP, true),
(4, 2, 4, 'Muy buen sedán, aunque el consumo podría ser mejor.', CURRENT_TIMESTAMP, true),
(2, 2, 5, 'Perfecto para viajes largos. La familia viajó muy cómoda.', CURRENT_TIMESTAMP, true),
(1, 2, 4, 'Sedán confiable y seguro. Buena experiencia general.', CURRENT_TIMESTAMP, true),

-- Reseñas para SUV Todoterreno Aventurero (product_id = 3)
(2, 3, 5, 'Increíble SUV, perfecto para aventuras off-road. Muy potente.', CURRENT_TIMESTAMP, true),
(4, 3, 5, 'Excelente para viajes familiares de aventura. Robusto y confiable.', CURRENT_TIMESTAMP, true),
(1, 3, 5, 'SUV increíble, superó todas mis expectativas.', CURRENT_TIMESTAMP, true),

-- Reseñas para Auto de Lujo Premium (product_id = 4)
(1, 4, 5, 'Un sueño hecho realidad. Excelente experiencia de conducción.', CURRENT_TIMESTAMP, true),
(2, 4, 5, 'Lujo y tecnología de primera. Vale cada euro pagado.', CURRENT_TIMESTAMP, true),
(3, 4, 5, 'Perfecto para una ocasión especial. Calidad premium.', CURRENT_TIMESTAMP, true),
(4, 4, 5, 'Experiencia de lujo incomparable. Altamente recomendado.', CURRENT_TIMESTAMP, true),

-- Reseñas para Van Espaciosa para Grupos (product_id = 5)
(1, 5, 4, 'Perfecta para el grupo grande. Muy espaciosa y cómoda.', CURRENT_TIMESTAMP, true),
(4, 5, 5, 'Ideal para mudanzas y viajes familiares numerosos.', CURRENT_TIMESTAMP, true),

-- Reseñas para Deportivo Alta Gama (product_id = 6)
(1, 6, 5, 'Velocidad y elegancia perfectamente combinadas. Increíble.', CURRENT_TIMESTAMP, true),
(2, 6, 5, 'Deportivo espectacular. Una experiencia única de conducción.', CURRENT_TIMESTAMP, true),
(3, 6, 4, 'Excelente deportivo, aunque el consumo es alto como era de esperarse.', CURRENT_TIMESTAMP, true),
(4, 6, 5, 'Perfecto para eventos corporativos especiales. Impresionante.', CURRENT_TIMESTAMP, true),

-- Reseñas para productos adicionales
(2, 7, 4, 'Excelente opción para viajes de negocios. Muy elegante.', CURRENT_TIMESTAMP, true),
(3, 7, 5, 'Perfecto balance entre lujo y practicidad.', CURRENT_TIMESTAMP, true),

(1, 8, 3, 'Cumple su función básica, aunque esperaba más comodidades.', CURRENT_TIMESTAMP, true),
(4, 8, 4, 'Buena relación calidad-precio. Recomendado para presupuestos ajustados.', CURRENT_TIMESTAMP, true); 