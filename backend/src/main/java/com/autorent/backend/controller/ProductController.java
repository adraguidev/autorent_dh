package com.autorent.backend.controller;

import com.autorent.backend.dto.AvailabilityRequestDto;
import com.autorent.backend.dto.AvailabilityResponseDto;
import com.autorent.backend.dto.ProductRequestDto;
import com.autorent.backend.dto.ProductResponseDto;
import com.autorent.backend.service.ProductService;
import com.autorent.backend.service.ReservationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;
    private final ReservationService reservationService;

    @Autowired
    public ProductController(ProductService productService, ReservationService reservationService) {
        this.productService = productService;
        this.reservationService = reservationService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponseDto>> searchProducts(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String priceRange,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        // Si se proporcionan fechas, buscar productos disponibles en esas fechas
        if (startDate != null && endDate != null) {
            List<ProductResponseDto> products = productService.searchProductsByDateRange(
                LocalDate.parse(startDate), LocalDate.parse(endDate), query, categoryId, priceRange);
            return ResponseEntity.ok(products);
        }
        
        List<ProductResponseDto> products = productService.searchProducts(query, categoryId, priceRange);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<String>> getSearchSuggestions(@RequestParam String query) {
        List<String> suggestions = productService.getSearchSuggestions(query);
        return ResponseEntity.ok(suggestions);
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

    // === ENDPOINTS DE DISPONIBILIDAD ===

    @PostMapping("/{id}/check-availability")
    public ResponseEntity<AvailabilityResponseDto> checkAvailability(
            @PathVariable Long id, 
            @RequestBody AvailabilityRequestDto requestDto) {
        AvailabilityResponseDto response = reservationService.checkAvailability(id, requestDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/booked-dates")
    public ResponseEntity<List<LocalDate>> getBookedDates(@PathVariable Long id) {
        List<LocalDate> bookedDates = reservationService.getBookedDates(id);
        return ResponseEntity.ok(bookedDates);
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<AvailabilityResponseDto> getProductAvailability(
            @PathVariable Long id,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        if (startDate != null && endDate != null) {
            AvailabilityRequestDto requestDto = new AvailabilityRequestDto(
                LocalDate.parse(startDate), LocalDate.parse(endDate)
            );
            return ResponseEntity.ok(reservationService.checkAvailability(id, requestDto));
        }
        
        // Si no se proporcionan fechas, solo verificar que el producto existe
        if (productService.getProductById(id).isPresent()) {
            return ResponseEntity.ok(AvailabilityResponseDto.available());
        } else {
            return ResponseEntity.ok(AvailabilityResponseDto.unavailable("Producto no encontrado"));
        }
    }

    @PostMapping("/{id}/search-by-dates")
    public ResponseEntity<List<ProductResponseDto>> searchProductsByDateRange(
            @RequestBody AvailabilityRequestDto dateRequest) {
        List<ProductResponseDto> availableProducts = productService.searchProductsByDateRange(
            dateRequest.getStartDate(), dateRequest.getEndDate(), null, null, null);
        return ResponseEntity.ok(availableProducts);
    }

    // === ENDPOINTS EXISTENTES ===

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
