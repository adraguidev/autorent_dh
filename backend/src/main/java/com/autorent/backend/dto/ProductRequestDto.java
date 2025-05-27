package com.autorent.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {
    private String name;
    private String description;
    private String price;
    private Long categoryId;
    private List<String> imageUrls;
    private List<Long> characteristicIds;
}
