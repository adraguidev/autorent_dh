package com.autorent.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequestDto {
    
    private Long userId;
    private Long productId;
    private Integer rating; // De 1 a 5
    private String comment;
} 