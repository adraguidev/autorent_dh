package com.autorent.backend.runner;

import com.autorent.backend.model.Category;
import com.autorent.backend.model.Product;
import com.autorent.backend.model.Characteristic;
import com.autorent.backend.repository.CategoryRepository;
import com.autorent.backend.repository.ProductRepository;
import com.autorent.backend.repository.CharacteristicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CharacteristicRepository characteristicRepository;

    @Autowired
    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository, CharacteristicRepository characteristicRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.characteristicRepository = characteristicRepository;
    }

    @Override
    @Transactional // Asegura que toda la operación se ejecute dentro de una transacción
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) { // Solo si no hay categorías
            // Crear Categorías con descripción e imagen
            Category catCompact = categoryRepository.save(new Category(
                "Compacto", 
                "Vehículos pequeños y eficientes, perfectos para la ciudad y viajes cortos.", 
                "/assets/categories/compacto.webp"
            ));
            Category catSedan = categoryRepository.save(new Category(
                "Sedán", 
                "Automóviles cómodos y espaciosos, ideales para familias y viajes largos.", 
                "/assets/categories/sedan.webp"
            ));
            Category catSUV = categoryRepository.save(new Category(
                "SUV", 
                "Vehículos utilitarios deportivos con mayor altura y capacidad todoterreno.", 
                "/assets/categories/suv.webp"
            ));
            Category catLujo = categoryRepository.save(new Category(
                "Lujo", 
                "Vehículos premium con las mejores comodidades y tecnología avanzada.", 
                "/assets/categories/lujo.webp"
            ));
            Category catVan = categoryRepository.save(new Category(
                "Van/Minivan", 
                "Vehículos espaciosos para grupos grandes y transporte de carga.", 
                "/assets/categories/van.webp"
            ));
            Category catDeportivo = categoryRepository.save(new Category(
                "Deportivo", 
                "Vehículos de alto rendimiento diseñados para la velocidad y la emoción.", 
                "/assets/categories/deportivo.webp"
            ));

            // Crear características si no existen
            if (characteristicRepository.count() == 0) {
                characteristicRepository.save(new Characteristic(null, "Aire Acondicionado", "fas fa-snowflake"));
                characteristicRepository.save(new Characteristic(null, "GPS", "fas fa-map-marked-alt"));
                characteristicRepository.save(new Characteristic(null, "Bluetooth", "fab fa-bluetooth"));
                characteristicRepository.save(new Characteristic(null, "Transmisión Automática", "fas fa-cogs"));
                characteristicRepository.save(new Characteristic(null, "WiFi", "fas fa-wifi"));
                characteristicRepository.save(new Characteristic(null, "USB", "fab fa-usb"));
                characteristicRepository.save(new Characteristic(null, "Asientos de Cuero", "fas fa-couch"));
                characteristicRepository.save(new Characteristic(null, "Radio Satelital", "fas fa-satellite"));
                characteristicRepository.save(new Characteristic(null, "Cámara de Reversa", "fas fa-video"));
                characteristicRepository.save(new Characteristic(null, "Control de Crucero", "fas fa-tachometer-alt"));
            }

            if (productRepository.count() == 0) { // Solo si no hay productos
                // Crear Productos con URLs reales de imágenes de Pexels
                Product product1 = new Product();
                product1.setName("Vehículo Compacto Económicos");
                product1.setDescription("Ideal para la ciudad, bajo consumo y fácil de estacionar.");
                product1.setPrice("$25/día");
                product1.setCategory(catCompact);
                product1.setImageUrls(Arrays.asList(
                    "https://images.pexels.com/photos/7290407/pexels-photo-7290407.jpeg",
                    "https://images.pexels.com/photos/7808349/pexels-photo-7808349.jpeg",
                    "https://images.pexels.com/photos/17450510/pexels-photo-17450510.jpeg"
                ));
                product1.setCharacteristics(new HashSet<>());
                productRepository.save(product1);

                Product product2 = new Product();
                product2.setName("Sedán Familiar Confortable");
                product2.setDescription("Espacioso y seguro, perfecto para viajes largos en familia.");
                product2.setPrice("$40/día");
                product2.setCategory(catSedan);
                product2.setImageUrls(Arrays.asList(
                    "https://images.pexels.com/photos/3541743/pexels-photo-3541743.jpeg",
                    "https://images.pexels.com/photos/3727937/pexels-photo-3727937.jpeg"
                ));
                product2.setCharacteristics(new HashSet<>());
                productRepository.save(product2);

                Product product3 = new Product();
                product3.setName("SUV Todoterreno Aventurero");
                product3.setDescription("Robusto y versátil para cualquier tipo de terreno y aventura.");
                product3.setPrice("$60/día");
                product3.setCategory(catSUV);
                product3.setImageUrls(Arrays.asList(
                    "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
                    "https://images.pexels.com/photos/32536589/pexels-photo-32536589.jpeg",
                    "https://images.pexels.com/photos/19410457/pexels-photo-19410457.jpeg"
                ));
                product3.setCharacteristics(new HashSet<>());
                productRepository.save(product3);

                Product product4 = new Product();
                product4.setName("Auto de Lujo Premium");
                product4.setDescription("Experiencia de conducción superior con máximo confort y tecnología.");
                product4.setPrice("$100/día");
                product4.setCategory(catLujo);
                product4.setImageUrls(Arrays.asList(
                    "https://images.pexels.com/photos/32609663/pexels-photo-32609663.jpeg",
                    "https://images.pexels.com/photos/32609622/pexels-photo-32609622.jpeg",
                    "https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg",
                    "https://images.pexels.com/photos/32609602/pexels-photo-32609602.jpeg"
                ));
                product4.setCharacteristics(new HashSet<>());
                productRepository.save(product4);

                Product product5 = new Product();
                product5.setName("Van Espaciosa para Grupos");
                product5.setDescription("Ideal para grupos grandes o familias numerosas, con mucho espacio.");
                product5.setPrice("$70/día");
                product5.setCategory(catVan);
                product5.setImageUrls(Arrays.asList(
                    "https://images.pexels.com/photos/21012245/pexels-photo-21012245.jpeg",
                    "https://images.pexels.com/photos/16510657/pexels-photo-16510657.jpeg",
                    "https://images.pexels.com/photos/12175736/pexels-photo-12175736.jpeg"
                ));
                product5.setCharacteristics(new HashSet<>());
                productRepository.save(product5);

                Product product6 = new Product();
                product6.setName("Deportivo Alta Gama");
                product6.setDescription("Velocidad y diseño se unen en este increíble deportivo.");
                product6.setPrice("$150/día");
                product6.setCategory(catDeportivo);
                product6.setImageUrls(Arrays.asList(
                    "https://images.pexels.com/photos/10394783/pexels-photo-10394783.jpeg",
                    "https://images.pexels.com/photos/10804351/pexels-photo-10804351.jpeg",
                    "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
                ));
                product6.setCharacteristics(new HashSet<>());
                productRepository.save(product6);

                Product product7 = new Product();
                product7.setName("Sedán de Lujo Ejecutivo");
                product7.setDescription("Perfecto para viajes de negocios, combina elegancia y rendimiento.");
                product7.setPrice("$85/día");
                product7.setCategory(catLujo);
                product7.setImageUrls(Arrays.asList(
                    "https://images.pexels.com/photos/18860536/pexels-photo-18860536.jpeg",
                    "https://images.pexels.com/photos/26691371/pexels-photo-26691371.jpeg",
                    "https://images.pexels.com/photos/12152812/pexels-photo-12152812.jpeg"
                ));
                product7.setCharacteristics(new HashSet<>());
                productRepository.save(product7);

                Product product8 = new Product();
                product8.setName("Compacto Deportivo Ágil");
                product8.setDescription("Diversión y agilidad en un paquete compacto y deportivo.");
                product8.setPrice("$35/día");
                product8.setCategory(catCompact);
                product8.setImageUrls(Arrays.asList(
                    "https://images.pexels.com/photos/27524717/pexels-photo-27524717.jpeg"
                ));
                product8.setCharacteristics(new HashSet<>());
                productRepository.save(product8);
            }
            System.out.println("✅ Base de datos inicializada con categorías, características y productos con imágenes reales.");
        } else {
            System.out.println("La base de datos ya contiene datos, no se inicializa.");
        }
    }
}
