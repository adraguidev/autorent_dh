-- MySQL dump 10.13  Distrib 9.3.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: autorent_db
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKt8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Vehículos pequeños y eficientes, perfectos para la ciudad y viajes cortos.','/src/assets/categories/compacto.webp','Compacto'),(2,'Automóviles cómodos y espaciosos, ideales para familias y viajes largos.','/src/assets/categories/sedan.webp','Sedán'),(3,'Vehículos utilitarios deportivos con mayor altura y capacidad todoterreno.','/src/assets/categories/suv.webp','SUV'),(4,'Vehículos premium con las mejores comodidades y tecnología avanzada.','/src/assets/categories/lujo.webp','Lujo'),(5,'Vehículos espaciosos para grupos grandes y transporte de carga.','/src/assets/categories/van.webp','Van/Minivan'),(6,'Vehículos de alto rendimiento diseñados para la velocidad y la emoción.','/src/assets/categories/deportivo.webp','Deportivo');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characteristics`
--

DROP TABLE IF EXISTS `characteristics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characteristics` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKp0bo0c4li14uo36djle1dj4ya` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characteristics`
--

LOCK TABLES `characteristics` WRITE;
/*!40000 ALTER TABLE `characteristics` DISABLE KEYS */;
INSERT INTO `characteristics` VALUES (1,'fas fa-snowflake','Aire Acondicionado'),(2,'fas fa-map-marked-alt','GPS'),(3,'fab fa-bluetooth','Bluetooth'),(4,'fas fa-cogs','Transmisión Automática'),(5,'fas fa-wifi','WiFi'),(6,'fab fa-usb','USB'),(7,'fas fa-couch','Asientos de Cuero'),(8,'fas fa-satellite','Radio Satelital'),(9,'fas fa-video','Cámara de Reversa'),(10,'fas fa-tachometer-alt','Control de Crucero');
/*!40000 ALTER TABLE `characteristics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_product` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (5,1,2,'2025-06-18 21:32:19'),(6,1,1,'2025-06-19 03:39:25'),(7,1,3,'2025-06-19 03:39:26'),(8,5,1,'2025-06-19 04:48:42');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_characteristics`
--

DROP TABLE IF EXISTS `product_characteristics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_characteristics` (
  `product_id` bigint NOT NULL,
  `characteristic_id` bigint NOT NULL,
  PRIMARY KEY (`product_id`,`characteristic_id`),
  KEY `FK4j2eyeedihx9i4dg3vgawqqls` (`characteristic_id`),
  CONSTRAINT `FK4j2eyeedihx9i4dg3vgawqqls` FOREIGN KEY (`characteristic_id`) REFERENCES `characteristics` (`id`),
  CONSTRAINT `FKlwuvy71q239qxmgor4u6ni4ej` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_characteristics`
--

LOCK TABLES `product_characteristics` WRITE;
/*!40000 ALTER TABLE `product_characteristics` DISABLE KEYS */;
INSERT INTO `product_characteristics` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(2,3),(3,3),(4,3),(5,3),(6,3),(7,3),(8,3),(1,4),(2,4),(3,4),(4,4),(5,4),(7,4),(8,4),(4,5),(6,5),(7,5),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),(8,6),(4,7),(6,7),(7,7),(4,8),(6,8),(7,8),(1,9),(2,9),(3,9),(4,9),(5,9),(6,9),(7,9),(8,9),(3,10),(4,10),(6,10),(7,10);
/*!40000 ALTER TABLE `product_characteristics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `product_id` bigint NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  KEY `FKqnq71xsohugpqwf3c9gxmsuy` (`product_id`),
  CONSTRAINT `FKqnq71xsohugpqwf3c9gxmsuy` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,'https://images.pexels.com/photos/7290407/pexels-photo-7290407.jpeg'),(1,'https://images.pexels.com/photos/7808349/pexels-photo-7808349.jpeg'),(1,'https://images.pexels.com/photos/17450510/pexels-photo-17450510.jpeg'),(2,'https://images.pexels.com/photos/3541743/pexels-photo-3541743.jpeg'),(2,'https://images.pexels.com/photos/3727937/pexels-photo-3727937.jpeg'),(3,'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'),(3,'https://images.pexels.com/photos/32536589/pexels-photo-32536589.jpeg'),(3,'https://images.pexels.com/photos/19410457/pexels-photo-19410457.jpeg'),(4,'https://images.pexels.com/photos/32609663/pexels-photo-32609663.jpeg'),(4,'https://images.pexels.com/photos/32609622/pexels-photo-32609622.jpeg'),(4,'https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg'),(4,'https://images.pexels.com/photos/32609602/pexels-photo-32609602.jpeg'),(5,'https://images.pexels.com/photos/21012245/pexels-photo-21012245.jpeg'),(5,'https://images.pexels.com/photos/16510657/pexels-photo-16510657.jpeg'),(5,'https://images.pexels.com/photos/12175736/pexels-photo-12175736.jpeg'),(6,'https://images.pexels.com/photos/10394783/pexels-photo-10394783.jpeg'),(6,'https://images.pexels.com/photos/10804351/pexels-photo-10804351.jpeg'),(6,'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'),(7,'https://images.pexels.com/photos/18860536/pexels-photo-18860536.jpeg'),(7,'https://images.pexels.com/photos/26691371/pexels-photo-26691371.jpeg'),(7,'https://images.pexels.com/photos/12152812/pexels-photo-12152812.jpeg'),(8,'https://images.pexels.com/photos/27524717/pexels-photo-27524717.jpeg');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(1000) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`),
  CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Ideal para la ciudad, bajo consumo y fácil de estacionar.','Vehículo Compacto Económicos','$25/día',1),(2,'Espacioso y seguro, perfecto para viajes largos en familia.','Sedán Familiar Confortable','$40/día',2),(3,'Robusto y versátil para cualquier tipo de terreno y aventura.','SUV Todoterreno Aventurero','$60/día',3),(4,'Experiencia de conducción superior con máximo confort y tecnología.','Auto de Lujo Premium','$100/día',4),(5,'Ideal para grupos grandes o familias numerosas, con mucho espacio.','Van Espaciosa para Grupos','$70/día',5),(6,'Velocidad y diseño se unen en este increíble deportivo.','Deportivo Alta Gama','$150/día',6),(7,'Perfecto para viajes de negocios, combina elegancia y rendimiento.','Sedán de Lujo Ejecutivo','$85/día',4),(8,'Diversión y agilidad en un paquete compacto y deportivo.','Compacto Deportivo Ágil','$35/día',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `end_date` date NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `start_date` date NOT NULL,
  `status` enum('ACTIVE','CANCELLED','COMPLETED','CONFIRMED','PENDING') NOT NULL,
  `total_price` decimal(38,2) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9a5732fneb7m092niwi680ukf` (`product_id`),
  KEY `FKb5g9io5h54iwl2inkno50ppln` (`user_id`),
  CONSTRAINT `FK9a5732fneb7m092niwi680ukf` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKb5g9io5h54iwl2inkno50ppln` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,'2025-05-30 05:33:06.854667','2025-06-20',NULL,'2025-06-15','CANCELLED',350.00,'2025-05-30 05:36:12.355398',1,1),(2,'2025-05-30 05:33:50.421214','2025-06-28',NULL,'2025-06-26','CANCELLED',50.00,'2025-05-30 05:36:17.642478',1,1),(3,'2025-05-30 05:33:51.801368','2025-06-28',NULL,'2025-06-26','CANCELLED',50.00,'2025-05-30 05:36:40.900308',1,1),(4,'2025-05-30 05:33:52.297884','2025-06-28',NULL,'2025-06-26','CANCELLED',50.00,'2025-05-30 05:36:36.758465',1,1),(5,'2025-05-30 05:33:52.467638','2025-06-28',NULL,'2025-06-26','CANCELLED',50.00,'2025-05-30 05:36:33.438060',1,1),(6,'2025-05-30 05:33:52.635490','2025-06-28',NULL,'2025-06-26','CANCELLED',50.00,'2025-05-30 05:36:30.616917',1,1),(7,'2025-05-30 05:33:52.800039','2025-06-28',NULL,'2025-06-26','CANCELLED',50.00,'2025-05-30 05:36:24.578326',1,1),(8,'2025-05-30 05:36:53.155895','2025-06-06',NULL,'2025-06-02','CONFIRMED',100.00,NULL,1,1),(9,'2025-05-30 05:39:17.461917','2025-06-28',NULL,'2025-06-26','CONFIRMED',0.00,NULL,1,1),(10,'2025-05-30 05:40:53.684999','2025-06-15',NULL,'2025-06-13','CONFIRMED',0.00,NULL,1,1),(11,'2025-05-30 05:42:55.030736','2025-06-22',NULL,'2025-06-20','CONFIRMED',0.00,NULL,1,1),(12,'2025-05-30 05:46:00.834626','2025-06-17',NULL,'2025-06-16','CONFIRMED',50.00,NULL,1,1),(13,'2025-06-19 04:37:51.057190','2025-07-05',NULL,'2025-07-01','CONFIRMED',125.00,NULL,1,1),(14,'2025-06-19 04:37:52.931318','2025-07-05',NULL,'2025-07-01','CONFIRMED',125.00,NULL,1,1),(15,'2025-06-19 04:38:20.133047','2025-07-27',NULL,'2025-07-21','CONFIRMED',595.00,NULL,7,1),(16,'2025-06-19 04:40:44.498586','2025-07-26',NULL,'2025-07-22','CONFIRMED',350.00,NULL,5,5),(17,'2025-06-19 04:44:11.217556','2025-07-24',NULL,'2025-07-08','CONFIRMED',595.00,NULL,8,1),(18,'2025-06-19 04:48:30.038658','2025-07-09',NULL,'2025-07-01','CONFIRMED',765.00,NULL,7,5),(19,'2025-06-19 04:57:17.667472','2025-06-26',NULL,'2025-06-19','CONFIRMED',800.00,NULL,4,1),(20,'2025-06-19 05:35:18.643164','2025-07-22',NULL,'2025-07-08','CONFIRMED',900.00,NULL,3,1);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(1000) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `rating` int NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `verified` bit(1) NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpl51cejpw4gy5swfar8br9ngi` (`product_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`),
  CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKpl51cejpw4gy5swfar8br9ngi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (21,'Muy buen vehículo para la ciudad. Consumo excelente y muy fácil de manejar.','2025-05-29 23:28:38.000000',4,NULL,_binary '',1,2),(22,'Perfecto para mis necesidades diarias. Lo recomiendo completamente.','2025-05-29 23:28:38.000000',5,NULL,_binary '',1,3),(23,'Económico y eficiente, justo lo que necesitaba.','2025-05-29 23:28:38.000000',4,NULL,_binary '',1,4),(24,'Excelente para viajes familiares. Muy cómodo y espacioso.','2025-05-29 23:28:38.000000',5,NULL,_binary '',2,3),(25,'Muy buen sedán, aunque el consumo podría ser mejor.','2025-05-29 23:28:38.000000',4,NULL,_binary '',2,4),(26,'Perfecto para viajes largos. La familia viajó muy cómoda.','2025-05-29 23:28:38.000000',5,NULL,_binary '',2,2),(27,'Sedán confiable y seguro. Buena experiencia general.','2025-05-29 23:28:38.000000',4,NULL,_binary '',2,1),(28,'Increíble SUV, perfecto para aventuras off-road. Muy potente.','2025-05-29 23:28:38.000000',5,NULL,_binary '',3,2),(29,'Excelente para viajes familiares de aventura. Robusto y confiable.','2025-05-29 23:28:38.000000',5,NULL,_binary '',3,4),(30,'SUV increíble, superó todas mis expectativas.','2025-05-29 23:28:38.000000',5,NULL,_binary '',3,1),(31,'Un sueño hecho realidad. Excelente experiencia de conducción.','2025-05-29 23:28:38.000000',5,NULL,_binary '',4,1),(32,'Lujo y tecnología de primera. Vale cada euro pagado.','2025-05-29 23:28:38.000000',5,NULL,_binary '',4,2),(33,'Perfecto para una ocasión especial. Calidad premium.','2025-05-29 23:28:38.000000',5,NULL,_binary '',4,3),(34,'Experiencia de lujo incomparable. Altamente recomendado.','2025-05-29 23:28:38.000000',5,NULL,_binary '',4,4),(35,'Perfecta para el grupo grande. Muy espaciosa y cómoda.','2025-05-29 23:28:38.000000',4,NULL,_binary '',5,1),(36,'Ideal para mudanzas y viajes familiares numerosos.','2025-05-29 23:28:38.000000',5,NULL,_binary '',5,4),(37,'Velocidad y elegancia perfectamente combinadas. Increíble.','2025-05-29 23:28:38.000000',5,NULL,_binary '',6,1),(38,'Deportivo espectacular. Una experiencia única de conducción.','2025-05-29 23:28:38.000000',5,NULL,_binary '',6,2),(39,'Excelente deportivo, aunque el consumo es alto como era de esperarse.','2025-05-29 23:28:38.000000',4,NULL,_binary '',6,3),(40,'Perfecto para eventos corporativos especiales. Impresionante.','2025-05-29 23:28:38.000000',5,NULL,_binary '',6,4),(41,'Excelente opción para viajes de negocios. Muy elegante.','2025-05-29 23:28:38.000000',4,NULL,_binary '',7,2),(42,'Perfecto balance entre lujo y practicidad.','2025-05-29 23:28:38.000000',5,NULL,_binary '',7,3),(43,'Cumple su función básica, aunque esperaba más comodidades.','2025-05-29 23:28:38.000000',3,NULL,_binary '',8,1),(44,'Buena relación calidad-precio. Recomendado para presupuestos ajustados.','2025-05-29 23:28:38.000000',4,NULL,_binary '',8,4);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `is_admin` bit(1) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@autorent.com','Admin',_binary '','Principal','$2a$10$H5CpYR9I6ILmVI7JdjKAX.5mcQQQKtVTL8k6u7yCdnjKSskZWRJCa'),(2,'juan.perez@email.com','Juan',_binary '\0','Pérez','$2a$10$vAeJgk6.ADFp02ik4qU.guTT8DBGQRes6581diMdNLsUrL0edgzUm'),(3,'maria.garcia@email.com','María',_binary '\0','García','$2a$10$.9dMo8y1mFQuhCnCgD85Tenp9Q2GbksrxcJHXLLJkknKq5Ip4nc2O'),(4,'carlos.rodriguez@email.com','Carlos',_binary '\0','Rodríguez','$2a$10$lAlkmB2sHluvWGXdm8hjceTy9SmBy8GIq3Yj/lFuFGekwq87vxoKm'),(5,'adragui@icloud.com','Adrian',_binary '\0','Aguirre','$2a$10$ogH1OHhbKfPXpBPFD8t7vOEnxXfiTujLZwbBLzqbl7qNATCWFogy.');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'autorent_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19  0:47:34
