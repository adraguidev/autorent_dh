package com.autorent.backend.runner;

import com.autorent.backend.model.Category;
import com.autorent.backend.model.Product;
import com.autorent.backend.repository.CategoryRepository;
import com.autorent.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Autowired
    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional // Asegura que toda la operación se ejecute dentro de una transacción
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) { // Solo si no hay categorías
            // Crear Categorías
            Category catCompact = categoryRepository.save(new Category("Compacto"));
            Category catSedan = categoryRepository.save(new Category("Sedán"));
            Category catSUV = categoryRepository.save(new Category("SUV"));
            Category catLujo = categoryRepository.save(new Category("Lujo"));
            Category catVan = categoryRepository.save(new Category("Van/Minivan"));
            Category catDeportivo = categoryRepository.save(new Category("Deportivo"));

            if (productRepository.count() == 0) { // Solo si no hay productos
                // Crear Productos
                productRepository.save(new Product(null, "Vehículo Compacto Económico", "Ideal para la ciudad, bajo consumo y fácil de estacionar.", "$25/día", catCompact, Arrays.asList("/src/assets/products/compacto_economico_1.webp", "/src/assets/products/compacto_economico_2.webp")));
                productRepository.save(new Product(null, "Sedán Familiar Confortable", "Espacioso y seguro, perfecto para viajes largos en familia.", "$40/día", catSedan, Arrays.asList("/src/assets/products/sedan_familiar_1.webp", "/src/assets/products/sedan_familiar_2.webp")));
                productRepository.save(new Product(null, "SUV Todoterreno Aventurero", "Robusto y versátil para cualquier tipo de terreno y aventura.", "$60/día", catSUV, Arrays.asList("/src/assets/products/suv_todoterreno_1.webp", "/src/assets/products/suv_todoterreno_2.webp")));
                productRepository.save(new Product(null, "Auto de Lujo Premium", "Experiencia de conducción superior con máximo confort y tecnología.", "$100/día", catLujo, Arrays.asList("/src/assets/products/lujo_premium_1.webp", "/src/assets/products/lujo_premium_2.webp")));
                productRepository.save(new Product(null, "Van Espaciosa para Grupos", "Ideal para grupos grandes o familias numerosas, con mucho espacio.", "$70/día", catVan, Arrays.asList("/src/assets/products/van_grupos_1.webp", "/src/assets/products/van_grupos_2.webp")));
                productRepository.save(new Product(null, "Deportivo Alta Gama", "Velocidad y diseño se unen en este increíble deportivo.", "$150/día", catDeportivo, Arrays.asList("/src/assets/products/deportivo_gama_alta_1.webp", "/src/assets/products/deportivo_gama_alta_2.webp")));
                productRepository.save(new Product(null, "Sedán de Lujo Ejecutivo", "Perfecto para viajes de negocios, combina elegancia y rendimiento.", "$85/día", catLujo, Arrays.asList("/src/assets/products/sedan_lujo_ejecutivo_1.webp")));
                productRepository.save(new Product(null, "Compacto Deportivo Ágil", "Diversión y agilidad en un paquete compacto y deportivo.", "$35/día", catCompact, Arrays.asList("/src/assets/products/compacto_deportivo_1.webp")));
            }
            System.out.println("Base de datos inicializada con categorías y productos.");
        } else {
            System.out.println("La base de datos ya contiene datos, no se inicializa.");
        }
    }
}
