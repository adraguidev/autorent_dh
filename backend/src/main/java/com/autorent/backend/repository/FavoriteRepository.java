package com.autorent.backend.repository;

import com.autorent.backend.model.Favorite;
import com.autorent.backend.model.User;
import com.autorent.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    // Obtener todos los favoritos de un usuario
    List<Favorite> findByUserId(Long userId);

    // Verificar si un producto es favorito de un usuario
    boolean existsByUserIdAndProductId(Long userId, Long productId);

    // Obtener un favorito específico por usuario y producto
    Optional<Favorite> findByUserIdAndProductId(Long userId, Long productId);

    // Obtener solo los IDs de productos favoritos de un usuario
    @Query("SELECT f.product.id FROM Favorite f WHERE f.user.id = :userId ORDER BY f.createdAt DESC")
    List<Long> findProductIdsByUserId(@Param("userId") Long userId);

    // Eliminar favorito por usuario y producto
    void deleteByUserIdAndProductId(Long userId, Long productId);

    // Contar favoritos de un usuario
    long countByUserId(Long userId);
} 