package com.autorent.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Datos para crear o actualizar un producto/vehículo")
public class ProductRequestDto {
    @Schema(description = "Nombre del vehículo", example = "Toyota Corolla 2023", required = true)
    private String name;
    
    @Schema(description = "Descripción detallada del vehículo", example = "Sedán económico con excelente rendimiento de combustible")
    private String description;
    
    @Schema(description = "Precio por día en USD", example = "45.50", required = true)
    private String price;
    
    @Schema(description = "ID de la categoría del vehículo", example = "1", required = true)
    private Long categoryId;
    
    @Schema(description = "URLs de las imágenes del vehículo")
    private List<String> imageUrls;
    
    @Schema(description = "IDs de las características del vehículo")
    private List<Long> characteristicIds;
}
