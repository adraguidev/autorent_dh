package com.autorent.backend.controller;

import com.autorent.backend.dto.ProductRequestDto;
import com.autorent.backend.dto.ProductResponseDto;
import com.autorent.backend.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long categoryId) {
        List<ProductResponseDto> products;
        if (name != null && !name.isEmpty()) {
            products = productService.searchProductsByName(name);
        } else if (categoryId != null) {
            products = productService.getProductsByCategoryId(categoryId);
        } else {
            products = productService.getAllProducts();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductRequestDto productRequestDto) {
        try {
            ProductResponseDto createdProduct = productService.createProduct(productRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductRequestDto productRequestDto) {
        try {
            return productService.updateProduct(id, productRequestDto)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.deleteProduct(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
