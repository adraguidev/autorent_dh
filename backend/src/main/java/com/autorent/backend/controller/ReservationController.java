package com.autorent.backend.controller;

import com.autorent.backend.dto.ReservationRequestDto;
import com.autorent.backend.dto.ReservationResponseDto;
import com.autorent.backend.model.Reservation;
import com.autorent.backend.service.ReservationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationRequestDto requestDto) {
        try {
            ReservationResponseDto createdReservation = reservationService.createReservation(requestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ReservationResponseDto>> getAllReservations() {
        List<ReservationResponseDto> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponseDto> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationResponseDto>> getReservationsByUserId(@PathVariable Long userId) {
        List<ReservationResponseDto> reservations = reservationService.getReservationsByUserId(userId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReservationResponseDto>> getReservationsByProductId(@PathVariable Long productId) {
        List<ReservationResponseDto> reservations = reservationService.getReservationsByProductId(productId);
        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateReservationStatus(
            @PathVariable Long id,
            @RequestParam Reservation.ReservationStatus status) {
        try {
            ReservationResponseDto updatedReservation = reservationService.updateReservationStatus(id, status);
            return ResponseEntity.ok(updatedReservation);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable Long id) {
        try {
            reservationService.cancelReservation(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }
} 