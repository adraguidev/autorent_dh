package com.autorent.backend.repository;

import com.autorent.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    // Encontrar todas las reservas de un usuario
    List<Reservation> findByUserId(Long userId);
    
    // Encontrar todas las reservas de un producto
    List<Reservation> findByProductId(Long productId);
    
    // Verificar si hay conflictos de fechas para un producto
    @Query("SELECT r FROM Reservation r WHERE r.product.id = :productId " +
           "AND r.status NOT IN ('CANCELLED') " +
           "AND ((r.startDate <= :endDate AND r.endDate >= :startDate))")
    List<Reservation> findConflictingReservations(
            @Param("productId") Long productId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
    
    // Obtener fechas ocupadas de un producto
    @Query("SELECT r.startDate, r.endDate FROM Reservation r WHERE r.product.id = :productId " +
           "AND r.status NOT IN ('CANCELLED') " +
           "AND r.endDate >= :currentDate")
    List<Object[]> findBookedDatesByProductId(
            @Param("productId") Long productId,
            @Param("currentDate") LocalDate currentDate);
    
    // Buscar reservas por estado
    List<Reservation> findByStatus(Reservation.ReservationStatus status);
    
    // Buscar reservas por rango de fechas
    @Query("SELECT r FROM Reservation r WHERE r.startDate >= :startDate AND r.endDate <= :endDate")
    List<Reservation> findByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
    
    // Buscar reservas activas de un usuario
    @Query("SELECT r FROM Reservation r WHERE r.user.id = :userId " +
           "AND r.status IN ('CONFIRMED', 'ACTIVE') " +
           "ORDER BY r.startDate ASC")
    List<Reservation> findActiveReservationsByUserId(@Param("userId") Long userId);
} 