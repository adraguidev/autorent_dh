package com.autorent.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvailabilityResponseDto {
    
    private boolean available;
    private String message;
    
    public static AvailabilityResponseDto available() {
        return new AvailabilityResponseDto(true, "Fechas disponibles");
    }
    
    public static AvailabilityResponseDto unavailable(String reason) {
        return new AvailabilityResponseDto(false, reason);
    }
} 