-- ================================================================
-- RELACIONES PRODUCTO-CARACTERÍSTICAS
-- ================================================================

-- Características por tipo de vehículo:
-- 1 = Aire Acondicionado, 2 = GPS, 3 = Bluetooth, 4 = Transmisión Automática, 5 = WiFi
-- 6 = USB, 7 = Asientos de Cuero, 8 = Radio Satelital, 9 = Cámara de Reversa, 10 = Control de Crucero

-- Vehículo Compacto Económico (id=1) - Características básicas
INSERT INTO product_characteristics (product_id, characteristic_id) VALUES 
(1, 1), -- Aire Acondicionado
(1, 3), -- Bluetooth
(1, 6); -- USB

-- Sedán Familiar Confortable (id=2) - Características familiares
INSERT INTO product_characteristics (product_id, characteristic_id) VALUES 
(2, 1), -- Aire Acondicionado
(2, 2), -- GPS
(2, 3), -- Bluetooth
(2, 4), -- Transmisión Automática
(2, 6), -- USB
(2, 9); -- Cámara de Reversa

-- SUV Todoterreno Aventurero (id=3) - Características aventureras
INSERT INTO product_characteristics (product_id, characteristic_id) VALUES 
(3, 1), -- Aire Acondicionado
(3, 2), -- GPS
(3, 3), -- Bluetooth
(3, 4), -- Transmisión Automática
(3, 6), -- USB
(3, 9), -- Cámara de Reversa
(3, 10); -- Control de Crucero

-- Auto de Lujo Premium (id=4) - Todas las características de lujo
INSERT INTO product_characteristics (product_id, characteristic_id) VALUES 
(4, 1), -- Aire Acondicionado
(4, 2), -- GPS
(4, 3), -- Bluetooth
(4, 4), -- Transmisión Automática
(4, 5), -- WiFi
(4, 6), -- USB
(4, 7), -- Asientos de Cuero
(4, 8), -- Radio Satelital
(4, 9), -- Cámara de Reversa
(4, 10); -- Control de Crucero

-- Van Espaciosa para Grupos (id=5) - Características prácticas
INSERT INTO product_characteristics (product_id, characteristic_id) VALUES 
(5, 1), -- Aire Acondicionado
(5, 2), -- GPS
(5, 3), -- Bluetooth
(5, 4), -- Transmisión Automática
(5, 6), -- USB
(5, 9); -- Cámara de Reversa

-- Deportivo Alta Gama (id=6) - Características deportivas y de lujo
INSERT INTO product_characteristics (product_id, characteristic_id) VALUES 
(6, 1), -- Aire Acondicionado
(6, 2), -- GPS
(6, 3), -- Bluetooth
(6, 5), -- WiFi
(6, 6), -- USB
(6, 7), -- Asientos de Cuero
(6, 8), -- Radio Satelital
(6, 9), -- Cámara de Reversa
(6, 10); -- Control de Crucero

-- Sedán de Lujo Ejecutivo (id=7) - Características ejecutivas
INSERT INTO product_characteristics (product_id, characteristic_id) VALUES 
(7, 1), -- Aire Acondicionado
(7, 2), -- GPS
(7, 3), -- Bluetooth
(7, 4), -- Transmisión Automática
(7, 5), -- WiFi
(7, 6), -- USB
(7, 7), -- Asientos de Cuero
(7, 8), -- Radio Satelital
(7, 9), -- Cámara de Reversa
(7, 10); -- Control de Crucero

-- Compacto Deportivo Ágil (id=8) - Características básicas deportivas
INSERT INTO product_characteristics (product_id, characteristic_id) VALUES 
(8, 1), -- Aire Acondicionado
(8, 3), -- Bluetooth
(8, 4), -- Transmisión Automática
(8, 6), -- USB
(8, 9); -- Cámara de Reversa 