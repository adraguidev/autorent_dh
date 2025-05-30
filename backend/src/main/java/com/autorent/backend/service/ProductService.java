package com.autorent.backend.service;

import com.autorent.backend.dto.CategoryDto;
import com.autorent.backend.dto.CharacteristicDto;
import com.autorent.backend.dto.ProductRequestDto;
import com.autorent.backend.dto.ProductResponseDto;
import com.autorent.backend.model.Category;
import com.autorent.backend.model.Characteristic;
import com.autorent.backend.model.Product;
import com.autorent.backend.repository.CategoryRepository;
import com.autorent.backend.repository.CharacteristicRepository;
import com.autorent.backend.repository.ProductRepository;
import com.autorent.backend.repository.ReservationRepository;
import com.autorent.backend.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CharacteristicRepository characteristicRepository;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, 
                         CategoryRepository categoryRepository, 
                         CharacteristicRepository characteristicRepository,
                         ReservationRepository reservationRepository,
                         ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.characteristicRepository = characteristicRepository;
        this.reservationRepository = reservationRepository;
        this.reviewRepository = reviewRepository;
    }

    private ProductResponseDto convertToDto(Product product) {
        CategoryDto categoryDto = new CategoryDto(
            product.getCategory().getId(), 
            product.getCategory().getName(),
            product.getCategory().getDescription(),
            product.getCategory().getImage()
        );
        
        List<CharacteristicDto> characteristicDtos = product.getCharacteristics() != null && !product.getCharacteristics().isEmpty() ? 
            product.getCharacteristics().stream()
                .map(characteristic -> new CharacteristicDto(characteristic.getId(), characteristic.getName(), characteristic.getIcon()))
                .collect(Collectors.toList()) : 
            List.of();
        
        // 📊 Calcular rating y total de reseñas
        Double averageRating = reviewRepository.getAverageRatingByProductId(product.getId());
        Long totalReviews = reviewRepository.countByProductId(product.getId());
        
        ProductResponseDto dto = new ProductResponseDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setCategory(categoryDto);
        dto.setImageUrls(product.getImageUrls() != null ? product.getImageUrls() : List.of());
        dto.setCharacteristics(characteristicDtos);
        dto.setAverageRating(averageRating != null ? averageRating : 0.0);
        dto.setTotalReviews(totalReviews != null ? totalReviews : 0L);
        
        return dto;
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ProductResponseDto> getProductById(Long id) {
        return productRepository.findById(id).map(this::convertToDto);
    }

    @Transactional
    public ProductResponseDto createProduct(ProductRequestDto productRequestDto) {
        Category category = categoryRepository.findById(productRequestDto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + productRequestDto.getCategoryId()));

        // Obtener características si se proporcionaron
        Set<Characteristic> characteristics = new HashSet<>();
        if (productRequestDto.getCharacteristicIds() != null && !productRequestDto.getCharacteristicIds().isEmpty()) {
            characteristics = productRequestDto.getCharacteristicIds().stream()
                    .map(id -> characteristicRepository.findById(id)
                            .orElseThrow(() -> new EntityNotFoundException("Characteristic not found with id: " + id)))
                    .collect(Collectors.toSet());
        }

        Product product = new Product();
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setPrice(productRequestDto.getPrice());
        product.setCategory(category);
        product.setImageUrls(productRequestDto.getImageUrls());
        product.setCharacteristics(characteristics);

        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    @Transactional
    public Optional<ProductResponseDto> updateProduct(Long id, ProductRequestDto productRequestDto) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    Category category = categoryRepository.findById(productRequestDto.getCategoryId())
                            .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + productRequestDto.getCategoryId()));

                    // Obtener características si se proporcionaron
                    Set<Characteristic> characteristics = new HashSet<>();
                    if (productRequestDto.getCharacteristicIds() != null && !productRequestDto.getCharacteristicIds().isEmpty()) {
                        characteristics = productRequestDto.getCharacteristicIds().stream()
                                .map(characteristicId -> characteristicRepository.findById(characteristicId)
                                        .orElseThrow(() -> new EntityNotFoundException("Characteristic not found with id: " + characteristicId)))
                                .collect(Collectors.toSet());
                    }

                    existingProduct.setName(productRequestDto.getName());
                    existingProduct.setDescription(productRequestDto.getDescription());
                    existingProduct.setPrice(productRequestDto.getPrice());
                    existingProduct.setCategory(category);
                    existingProduct.setImageUrls(productRequestDto.getImageUrls());
                    existingProduct.setCharacteristics(characteristics);

                    Product updatedProduct = productRepository.save(existingProduct);
                    return convertToDto(updatedProduct);
                });
    }

    @Transactional
    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDto> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDto> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name).stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDto> searchProducts(String query, Long categoryId, String priceRange) {
        List<Product> products;
        
        if (query != null && !query.trim().isEmpty() && categoryId != null) {
            // Búsqueda por nombre y categoría
            products = productRepository.findByNameContainingIgnoreCaseAndCategoryId(query.trim(), categoryId);
        } else if (query != null && !query.trim().isEmpty()) {
            // Búsqueda solo por nombre
            products = productRepository.findByNameContainingIgnoreCase(query.trim());
        } else if (categoryId != null) {
            // Búsqueda solo por categoría
            products = productRepository.findByCategoryId(categoryId);
        } else {
            // Sin filtros, devolver todos
            products = productRepository.findAll();
        }
        
        return products.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<String> getSearchSuggestions(String query) {
        if (query == null || query.trim().length() < 2) {
            return List.of();
        }
        
        List<Product> products = productRepository.findByNameContainingIgnoreCase(query.trim());
        return products.stream()
            .map(Product::getName)
            .distinct()
            .limit(5)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDto> searchProductsByDateRange(LocalDate startDate, LocalDate endDate, 
                                                             String query, Long categoryId, String priceRange) {
        // Primero obtener todos los productos que coinciden con los filtros básicos
        List<Product> allProducts = searchProductsBasic(query, categoryId, priceRange);
        
        // Filtrar solo los productos que están disponibles en el rango de fechas
        List<Product> availableProducts = allProducts.stream()
            .filter(product -> isProductAvailableInDateRange(product.getId(), startDate, endDate))
            .collect(Collectors.toList());
        
        return availableProducts.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    private List<Product> searchProductsBasic(String query, Long categoryId, String priceRange) {
        if (query != null && !query.trim().isEmpty() && categoryId != null) {
            return productRepository.findByNameContainingIgnoreCaseAndCategoryId(query.trim(), categoryId);
        } else if (query != null && !query.trim().isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(query.trim());
        } else if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId);
        } else {
            return productRepository.findAll();
        }
    }

    private boolean isProductAvailableInDateRange(Long productId, LocalDate startDate, LocalDate endDate) {
        // Verificar si hay conflictos de reservas para este producto en el rango de fechas
        return reservationRepository.findConflictingReservations(productId, startDate, endDate).isEmpty();
    }
}
