package com.autorent.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status = ReservationStatus.PENDING;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime updatedAt;

    @Column(length = 1000)
    private String notes;

    // Calculamos automáticamente la duración en días
    public int getDurationDays() {
        if (startDate != null && endDate != null) {
            return (int) java.time.temporal.ChronoUnit.DAYS.between(startDate, endDate);
        }
        return 0;
    }

    // Enum para el estado de la reserva
    public enum ReservationStatus {
        PENDING,     // Pendiente de confirmación
        CONFIRMED,   // Confirmada
        ACTIVE,      // En curso (vehículo entregado)
        COMPLETED,   // Completada (vehículo devuelto)
        CANCELLED    // Cancelada
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 