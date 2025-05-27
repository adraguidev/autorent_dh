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
                "/src/assets/categories/compacto.webp"
            ));
            Category catSedan = categoryRepository.save(new Category(
                "Sedán", 
                "Automóviles cómodos y espaciosos, ideales para familias y viajes largos.", 
                "/src/assets/categories/sedan.webp"
            ));
            Category catSUV = categoryRepository.save(new Category(
                "SUV", 
                "Vehículos utilitarios deportivos con mayor altura y capacidad todoterreno.", 
                "/src/assets/categories/suv.webp"
            ));
            Category catLujo = categoryRepository.save(new Category(
                "Lujo", 
                "Vehículos premium con las mejores comodidades y tecnología avanzada.", 
                "/src/assets/categories/lujo.webp"
            ));
            Category catVan = categoryRepository.save(new Category(
                "Van/Minivan", 
                "Vehículos espaciosos para grupos grandes y transporte de carga.", 
                "/src/assets/categories/van.webp"
            ));
            Category catDeportivo = categoryRepository.save(new Category(
                "Deportivo", 
                "Vehículos de alto rendimiento diseñados para la velocidad y la emoción.", 
                "/src/assets/categories/deportivo.webp"
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
                // Crear Productos usando constructor por defecto y setters
                Product product1 = new Product();
                product1.setName("Vehículo Compacto Económico");
                product1.setDescription("Ideal para la ciudad, bajo consumo y fácil de estacionar.");
                product1.setPrice("$25/día");
                product1.setCategory(catCompact);
                product1.setImageUrls(Arrays.asList("/src/assets/products/compacto_economico_1.webp", "/src/assets/products/compacto_economico_2.webp"));
                product1.setCharacteristics(new HashSet<>());
                productRepository.save(product1);

                Product product2 = new Product();
                product2.setName("Sedán Familiar Confortable");
                product2.setDescription("Espacioso y seguro, perfecto para viajes largos en familia.");
                product2.setPrice("$40/día");
                product2.setCategory(catSedan);
                product2.setImageUrls(Arrays.asList("/src/assets/products/sedan_familiar_1.webp", "/src/assets/products/sedan_familiar_2.webp"));
                product2.setCharacteristics(new HashSet<>());
                productRepository.save(product2);

                Product product3 = new Product();
                product3.setName("SUV Todoterreno Aventurero");
                product3.setDescription("Robusto y versátil para cualquier tipo de terreno y aventura.");
                product3.setPrice("$60/día");
                product3.setCategory(catSUV);
                product3.setImageUrls(Arrays.asList("/src/assets/products/suv_todoterreno_1.webp", "/src/assets/products/suv_todoterreno_2.webp"));
                product3.setCharacteristics(new HashSet<>());
                productRepository.save(product3);

                Product product4 = new Product();
                product4.setName("Auto de Lujo Premium");
                product4.setDescription("Experiencia de conducción superior con máximo confort y tecnología.");
                product4.setPrice("$100/día");
                product4.setCategory(catLujo);
                product4.setImageUrls(Arrays.asList("/src/assets/products/lujo_premium_1.webp", "/src/assets/products/lujo_premium_2.webp"));
                product4.setCharacteristics(new HashSet<>());
                productRepository.save(product4);

                Product product5 = new Product();
                product5.setName("Van Espaciosa para Grupos");
                product5.setDescription("Ideal para grupos grandes o familias numerosas, con mucho espacio.");
                product5.setPrice("$70/día");
                product5.setCategory(catVan);
                product5.setImageUrls(Arrays.asList("/src/assets/products/van_grupos_1.webp", "/src/assets/products/van_grupos_2.webp"));
                product5.setCharacteristics(new HashSet<>());
                productRepository.save(product5);

                Product product6 = new Product();
                product6.setName("Deportivo Alta Gama");
                product6.setDescription("Velocidad y diseño se unen en este increíble deportivo.");
                product6.setPrice("$150/día");
                product6.setCategory(catDeportivo);
                product6.setImageUrls(Arrays.asList("/src/assets/products/deportivo_gama_alta_1.webp", "/src/assets/products/deportivo_gama_alta_2.webp"));
                product6.setCharacteristics(new HashSet<>());
                productRepository.save(product6);

                Product product7 = new Product();
                product7.setName("Sedán de Lujo Ejecutivo");
                product7.setDescription("Perfecto para viajes de negocios, combina elegancia y rendimiento.");
                product7.setPrice("$85/día");
                product7.setCategory(catLujo);
                product7.setImageUrls(Arrays.asList("/src/assets/products/sedan_lujo_ejecutivo_1.webp"));
                product7.setCharacteristics(new HashSet<>());
                productRepository.save(product7);

                Product product8 = new Product();
                product8.setName("Compacto Deportivo Ágil");
                product8.setDescription("Diversión y agilidad en un paquete compacto y deportivo.");
                product8.setPrice("$35/día");
                product8.setCategory(catCompact);
                product8.setImageUrls(Arrays.asList("/src/assets/products/compacto_deportivo_1.webp"));
                product8.setCharacteristics(new HashSet<>());
                productRepository.save(product8);
            }
            System.out.println("Base de datos inicializada con categorías, características y productos.");
        } else {
            System.out.println("La base de datos ya contiene datos, no se inicializa.");
        }
    }
}
