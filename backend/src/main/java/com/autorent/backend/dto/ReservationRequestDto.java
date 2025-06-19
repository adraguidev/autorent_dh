package com.autorent.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Datos para crear una nueva reserva")
public class ReservationRequestDto {
    
    @Schema(description = "ID del producto/vehículo a reservar", example = "1", required = true)
    private Long productId;
    
    @Schema(description = "ID del usuario que realiza la reserva", example = "1", required = true)
    private Long userId;
    
    @Schema(description = "Fecha de inicio de la reserva", example = "2024-07-15", required = true)
    private LocalDate startDate;
    
    @Schema(description = "Fecha de fin de la reserva", example = "2024-07-20", required = true)
    private LocalDate endDate;
    
    @Schema(description = "Precio total de la reserva", example = "275.50", required = true)
    private BigDecimal totalPrice;
    
    @Schema(description = "Notas adicionales sobre la reserva", example = "Recogida en aeropuerto")
    private String notes;
} 