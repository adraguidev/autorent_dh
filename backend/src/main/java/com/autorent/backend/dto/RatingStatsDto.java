package com.autorent.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingStatsDto {
    
    private Double averageRating;
    private Long totalReviews;
    private Integer[] ratingDistribution; // Array con la distribución [1estrella, 2estrellas, 3estrellas, 4estrellas, 5estrellas]
} 