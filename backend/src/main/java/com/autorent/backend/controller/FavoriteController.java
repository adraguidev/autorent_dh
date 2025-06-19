package com.autorent.backend.controller;

import com.autorent.backend.model.Favorite;
import com.autorent.backend.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users/{userId}/favorites")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Favoritos", description = "Gestión de productos favoritos de usuarios")
@SecurityRequirement(name = "bearerAuth")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @Operation(
        summary = "Obtener favoritos del usuario",
        description = "Recupera la lista de IDs de productos favoritos de un usuario específico"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de favoritos obtenida exitosamente",
                content = @Content(array = @ArraySchema(schema = @Schema(implementation = Long.class)))),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado"),
        @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @GetMapping
    public ResponseEntity<List<Long>> getUserFavorites(
            @Parameter(description = "ID del usuario") @PathVariable Long userId) {
        try {
            List<Long> favorites = favoriteService.getUserFavorites(userId);
            return ResponseEntity.ok(favorites);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(
        summary = "Agregar producto a favoritos",
        description = "Añade un producto específico a la lista de favoritos del usuario"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Producto agregado a favoritos exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos o producto ya en favoritos"),
        @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @PostMapping("/{productId}")
    public ResponseEntity<?> addToFavorites(
            @Parameter(description = "ID del usuario") @PathVariable Long userId, 
            @Parameter(description = "ID del producto") @PathVariable Long productId) {
        try {
            Favorite favorite = favoriteService.addToFavorites(userId, productId);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                    "message", "Producto agregado a favoritos",
                    "favoriteId", favorite.getId()
                ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Error al agregar a favoritos"));
        }
    }

    /**
     * Remueve un producto de favoritos
     */
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromFavorites(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            favoriteService.removeFromFavorites(userId, productId);
            return ResponseEntity.ok(Map.of("message", "Producto removido de favoritos"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Error al remover de favoritos"));
        }
    }

    /**
     * Verifica si un producto está en favoritos
     */
    @GetMapping("/{productId}/check")
    public ResponseEntity<Boolean> checkIfFavorite(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            boolean isFavorite = favoriteService.isProductInFavorites(userId, productId);
            return ResponseEntity.ok(isFavorite);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Obtiene el conteo de favoritos de un usuario
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getFavoritesCount(@PathVariable Long userId) {
        try {
            long count = favoriteService.getFavoritesCount(userId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Obtiene favoritos con detalles completos del producto
     */
    @GetMapping("/details")
    public ResponseEntity<List<Favorite>> getUserFavoritesWithDetails(@PathVariable Long userId) {
        try {
            List<Favorite> favorites = favoriteService.getUserFavoritesWithDetails(userId);
            return ResponseEntity.ok(favorites);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 