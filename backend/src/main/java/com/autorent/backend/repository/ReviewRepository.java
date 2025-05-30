package com.autorent.backend.repository;

import com.autorent.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    // Obtener todas las reseñas de un producto
    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);
    
    // Obtener todas las reseñas de un usuario
    List<Review> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    // Verificar si un usuario ya reseñó un producto
    Optional<Review> findByUserIdAndProductId(Long userId, Long productId);
    
    // Obtener el promedio de puntuación de un producto
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Double getAverageRatingByProductId(@Param("productId") Long productId);
    
    // Contar el número total de reseñas de un producto
    Long countByProductId(Long productId);
    
    // Obtener reseñas verificadas de un producto
    List<Review> findByProductIdAndVerifiedTrueOrderByCreatedAtDesc(Long productId);
} 