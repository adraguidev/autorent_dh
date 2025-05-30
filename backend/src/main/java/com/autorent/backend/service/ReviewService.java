package com.autorent.backend.service;

import com.autorent.backend.dto.RatingStatsDto;
import com.autorent.backend.dto.ReviewRequestDto;
import com.autorent.backend.dto.ReviewResponseDto;
import com.autorent.backend.model.Product;
import com.autorent.backend.model.Review;
import com.autorent.backend.model.User;
import com.autorent.backend.repository.ProductRepository;
import com.autorent.backend.repository.ReviewRepository;
import com.autorent.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public ReviewResponseDto createReview(ReviewRequestDto requestDto) {
        // Validar que el usuario existe
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Validar que el producto existe
        Product product = productRepository.findById(requestDto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        // Verificar que el usuario no haya reseñado ya este producto
        Optional<Review> existingReview = reviewRepository.findByUserIdAndProductId(
                requestDto.getUserId(), requestDto.getProductId());
        
        if (existingReview.isPresent()) {
            throw new IllegalArgumentException("Ya has reseñado este producto");
        }

        // Validar rating
        if (requestDto.getRating() < 1 || requestDto.getRating() > 5) {
            throw new IllegalArgumentException("La puntuación debe estar entre 1 y 5");
        }

        // Crear la reseña
        Review review = new Review(user, product, requestDto.getRating(), requestDto.getComment());
        Review savedReview = reviewRepository.save(review);

        return convertToResponseDto(savedReview);
    }

    public List<ReviewResponseDto> getProductReviews(Long productId) {
        List<Review> reviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
        return reviews.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public List<ReviewResponseDto> getUserReviews(Long userId) {
        List<Review> reviews = reviewRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return reviews.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public Optional<ReviewResponseDto> getUserReview(Long userId, Long productId) {
        Optional<Review> review = reviewRepository.findByUserIdAndProductId(userId, productId);
        return review.map(this::convertToResponseDto);
    }

    public RatingStatsDto getProductRatingStats(Long productId) {
        List<Review> reviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
        
        if (reviews.isEmpty()) {
            return new RatingStatsDto(0.0, 0L, new Integer[]{0, 0, 0, 0, 0});
        }

        Double averageRating = reviewRepository.getAverageRatingByProductId(productId);
        Long totalReviews = reviewRepository.countByProductId(productId);

        // Calcular distribución de puntuaciones
        Integer[] distribution = new Integer[5];
        for (int i = 0; i < 5; i++) {
            distribution[i] = 0;
        }

        for (Review review : reviews) {
            distribution[review.getRating() - 1]++;
        }

        return new RatingStatsDto(averageRating, totalReviews, distribution);
    }

    public boolean deleteReview(Long reviewId, Long userId) {
        Optional<Review> reviewOpt = reviewRepository.findById(reviewId);
        
        if (reviewOpt.isEmpty()) {
            return false;
        }

        Review review = reviewOpt.get();
        
        // Solo el autor de la reseña puede eliminarla
        if (!review.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("No tienes permisos para eliminar esta reseña");
        }

        reviewRepository.delete(review);
        return true;
    }

    public ReviewResponseDto updateReview(Long reviewId, ReviewRequestDto requestDto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Reseña no encontrada"));

        // Solo el autor puede actualizar la reseña
        if (!review.getUser().getId().equals(requestDto.getUserId())) {
            throw new IllegalArgumentException("No tienes permisos para actualizar esta reseña");
        }

        // Validar rating
        if (requestDto.getRating() < 1 || requestDto.getRating() > 5) {
            throw new IllegalArgumentException("La puntuación debe estar entre 1 y 5");
        }

        review.setRating(requestDto.getRating());
        review.setComment(requestDto.getComment());
        
        Review updatedReview = reviewRepository.save(review);
        return convertToResponseDto(updatedReview);
    }

    private ReviewResponseDto convertToResponseDto(Review review) {
        return new ReviewResponseDto(
                review.getId(),
                review.getUser().getId(),
                review.getUser().getFirstName() + " " + review.getUser().getLastName(),
                review.getProduct().getId(),
                review.getProduct().getName(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUpdatedAt(),
                review.getVerified()
        );
    }
} 