package com.autorent.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.ALWAYS)
public class ProductResponseDto {
    private Long id;
    private String name;
    private String description;
    private String price;
    private CategoryDto category;
    private List<String> imageUrls;
    private List<CharacteristicDto> characteristics;
}
