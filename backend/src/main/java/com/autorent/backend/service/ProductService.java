package com.autorent.backend.service;

import com.autorent.backend.dto.CategoryDto;
import com.autorent.backend.dto.ProductRequestDto;
import com.autorent.backend.dto.ProductResponseDto;
import com.autorent.backend.model.Category;
import com.autorent.backend.model.Product;
import com.autorent.backend.repository.CategoryRepository;
import com.autorent.backend.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository; // Para obtener la entidad Category

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    private ProductResponseDto convertToDto(Product product) {
        CategoryDto categoryDto = new CategoryDto(product.getCategory().getId(), product.getCategory().getName());
        return new ProductResponseDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                categoryDto,
                product.getImageUrls()
        );
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

        Product product = new Product();
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setPrice(productRequestDto.getPrice());
        product.setCategory(category);
        product.setImageUrls(productRequestDto.getImageUrls());

        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    @Transactional
    public Optional<ProductResponseDto> updateProduct(Long id, ProductRequestDto productRequestDto) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    Category category = categoryRepository.findById(productRequestDto.getCategoryId())
                            .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + productRequestDto.getCategoryId()));

                    existingProduct.setName(productRequestDto.getName());
                    existingProduct.setDescription(productRequestDto.getDescription());
                    existingProduct.setPrice(productRequestDto.getPrice());
                    existingProduct.setCategory(category);
                    existingProduct.setImageUrls(productRequestDto.getImageUrls());

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
}
