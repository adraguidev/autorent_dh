package com.autorent.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {
    private Long id;
    private String name;
    private String description;
    private String price;
    private CategoryDto category; // Enviamos el DTO de la categoría
    private List<String> imageUrls;
}
