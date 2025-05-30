package com.autorent.backend.dto;

import com.autorent.backend.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDto {
    
    private Long id;
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private Long productId;
    private String productName;
    private String productDescription;
    private String productPrice;
    private LocalDate startDate;
    private LocalDate endDate;
    private int durationDays;
    private BigDecimal totalPrice;
    private Reservation.ReservationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String notes;
} 