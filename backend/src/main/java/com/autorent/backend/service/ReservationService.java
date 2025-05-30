package com.autorent.backend.service;

import com.autorent.backend.dto.*;
import com.autorent.backend.model.Product;
import com.autorent.backend.model.Reservation;
import com.autorent.backend.model.User;
import com.autorent.backend.repository.ProductRepository;
import com.autorent.backend.repository.ReservationRepository;
import com.autorent.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository,
                             UserRepository userRepository,
                             ProductRepository productRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public ReservationResponseDto createReservation(ReservationRequestDto requestDto) {
        // Validar que el usuario existe
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Validar que el producto existe
        Product product = productRepository.findById(requestDto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        // Validar fechas
        if (requestDto.getStartDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser en el pasado");
        }

        if (requestDto.getEndDate().isBefore(requestDto.getStartDate())) {
            throw new IllegalArgumentException("La fecha de fin debe ser posterior a la fecha de inicio");
        }

        // Verificar disponibilidad
        List<Reservation> conflicts = reservationRepository.findConflictingReservations(
                requestDto.getProductId(),
                requestDto.getStartDate(),
                requestDto.getEndDate()
        );

        if (!conflicts.isEmpty()) {
            throw new IllegalArgumentException("El producto no está disponible en las fechas seleccionadas");
        }

        // Crear la reserva
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setProduct(product);
        reservation.setStartDate(requestDto.getStartDate());
        reservation.setEndDate(requestDto.getEndDate());
        reservation.setTotalPrice(requestDto.getTotalPrice());
        reservation.setNotes(requestDto.getNotes());
        reservation.setStatus(Reservation.ReservationStatus.CONFIRMED);

        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToResponseDto(savedReservation);
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ReservationResponseDto> getReservationById(Long id) {
        return reservationRepository.findById(id)
                .map(this::mapToResponseDto);
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getReservationsByUserId(Long userId) {
        return reservationRepository.findByUserId(userId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getReservationsByProductId(Long productId) {
        return reservationRepository.findByProductId(productId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public ReservationResponseDto updateReservationStatus(Long reservationId, Reservation.ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada"));

        reservation.setStatus(status);
        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToResponseDto(savedReservation);
    }

    public void cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada"));

        reservation.setStatus(Reservation.ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    @Transactional(readOnly = true)
    public AvailabilityResponseDto checkAvailability(Long productId, AvailabilityRequestDto requestDto) {
        // Verificar que el producto existe
        if (!productRepository.existsById(productId)) {
            return AvailabilityResponseDto.unavailable("Producto no encontrado");
        }

        // Validar fechas
        if (requestDto.getStartDate().isBefore(LocalDate.now())) {
            return AvailabilityResponseDto.unavailable("La fecha de inicio no puede ser en el pasado");
        }

        if (requestDto.getEndDate().isBefore(requestDto.getStartDate())) {
            return AvailabilityResponseDto.unavailable("La fecha de fin debe ser posterior a la fecha de inicio");
        }

        // Verificar conflictos
        List<Reservation> conflicts = reservationRepository.findConflictingReservations(
                productId,
                requestDto.getStartDate(),
                requestDto.getEndDate()
        );

        if (!conflicts.isEmpty()) {
            return AvailabilityResponseDto.unavailable("Fechas no disponibles");
        }

        return AvailabilityResponseDto.available();
    }

    @Transactional(readOnly = true)
    public List<LocalDate> getBookedDates(Long productId) {
        List<Object[]> bookedDateRanges = reservationRepository.findBookedDatesByProductId(
                productId, LocalDate.now()
        );

        List<LocalDate> bookedDates = new ArrayList<>();
        for (Object[] range : bookedDateRanges) {
            LocalDate start = (LocalDate) range[0];
            LocalDate end = (LocalDate) range[1];
            
            // Generar todas las fechas en el rango
            LocalDate current = start;
            while (!current.isAfter(end)) {
                bookedDates.add(current);
                current = current.plusDays(1);
            }
        }

        return bookedDates;
    }

    private ReservationResponseDto mapToResponseDto(Reservation reservation) {
        ReservationResponseDto dto = new ReservationResponseDto();
        dto.setId(reservation.getId());
        dto.setUserId(reservation.getUser().getId());
        dto.setUserFirstName(reservation.getUser().getFirstName());
        dto.setUserLastName(reservation.getUser().getLastName());
        dto.setUserEmail(reservation.getUser().getEmail());
        dto.setProductId(reservation.getProduct().getId());
        dto.setProductName(reservation.getProduct().getName());
        dto.setProductDescription(reservation.getProduct().getDescription());
        dto.setProductPrice(reservation.getProduct().getPrice());
        dto.setStartDate(reservation.getStartDate());
        dto.setEndDate(reservation.getEndDate());
        dto.setDurationDays(reservation.getDurationDays());
        dto.setTotalPrice(reservation.getTotalPrice());
        dto.setStatus(reservation.getStatus());
        dto.setCreatedAt(reservation.getCreatedAt());
        dto.setUpdatedAt(reservation.getUpdatedAt());
        dto.setNotes(reservation.getNotes());
        return dto;
    }
} 