package com.autorent.backend.service;

import com.autorent.backend.model.Favorite;
import com.autorent.backend.model.User;
import com.autorent.backend.model.Product;
import com.autorent.backend.repository.FavoriteRepository;
import com.autorent.backend.repository.UserRepository;
import com.autorent.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository, 
                          UserRepository userRepository, 
                          ProductRepository productRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /**
     * Obtiene todos los favoritos de un usuario (solo los IDs de productos)
     */
    public List<Long> getUserFavorites(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("Usuario no encontrado con ID: " + userId);
        }
        
        return favoriteRepository.findProductIdsByUserId(userId);
    }

    /**
     * Agrega un producto a favoritos
     */
    @Transactional
    public Favorite addToFavorites(Long userId, Long productId) {
        // Verificar que el usuario existe
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + userId));

        // Verificar que el producto existe
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + productId));

        // Verificar si ya está en favoritos
        if (favoriteRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new IllegalArgumentException("El producto ya está en favoritos");
        }

        // Crear y guardar el favorito
        Favorite favorite = new Favorite(user, product);
        return favoriteRepository.save(favorite);
    }

    /**
     * Remueve un producto de favoritos
     */
    @Transactional
    public void removeFromFavorites(Long userId, Long productId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("Usuario no encontrado con ID: " + userId);
        }

        if (!productRepository.existsById(productId)) {
            throw new IllegalArgumentException("Producto no encontrado con ID: " + productId);
        }

        if (!favoriteRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new IllegalArgumentException("El producto no está en favoritos");
        }

        favoriteRepository.deleteByUserIdAndProductId(userId, productId);
    }

    /**
     * Verifica si un producto está en favoritos de un usuario
     */
    public boolean isProductInFavorites(Long userId, Long productId) {
        if (!userRepository.existsById(userId)) {
            return false;
        }

        if (!productRepository.existsById(productId)) {
            return false;
        }

        return favoriteRepository.existsByUserIdAndProductId(userId, productId);
    }

    /**
     * Obtiene el número de favoritos de un usuario
     */
    public long getFavoritesCount(Long userId) {
        if (!userRepository.existsById(userId)) {
            return 0;
        }

        return favoriteRepository.countByUserId(userId);
    }

    /**
     * Obtiene todos los favoritos completos de un usuario (con información del producto)
     */
    public List<Favorite> getUserFavoritesWithDetails(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("Usuario no encontrado con ID: " + userId);
        }
        
        return favoriteRepository.findByUserId(userId);
    }
} 