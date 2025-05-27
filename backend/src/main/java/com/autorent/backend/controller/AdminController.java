package com.autorent.backend.controller;

import com.autorent.backend.dto.UserDto;
import com.autorent.backend.model.User;
import com.autorent.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * Obtiene todos los usuarios registrados
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        try {
            List<User> users = adminService.getAllUsers();
            List<UserDto> userDtos = users.stream()
                .map(user -> new UserDto(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getIsAdmin()
                ))
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(userDtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Obtiene información de un usuario específico
     */
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        try {
            Optional<User> userOptional = adminService.getUserById(userId);
            
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            User user = userOptional.get();
            UserDto userDto = new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getIsAdmin()
            );
            
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Otorga permisos de administrador a un usuario
     */
    @PostMapping("/users/{userId}/grant-admin")
    public ResponseEntity<UserDto> grantAdminPermissions(@PathVariable Long userId) {
        try {
            User updatedUser = adminService.grantAdminPermissions(userId);
            UserDto userDto = new UserDto(
                updatedUser.getId(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail(),
                updatedUser.getIsAdmin()
            );
            
            return ResponseEntity.ok(userDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Revoca permisos de administrador a un usuario
     */
    @PostMapping("/users/{userId}/revoke-admin")
    public ResponseEntity<UserDto> revokeAdminPermissions(@PathVariable Long userId) {
        try {
            User updatedUser = adminService.revokeAdminPermissions(userId);
            UserDto userDto = new UserDto(
                updatedUser.getId(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail(),
                updatedUser.getIsAdmin()
            );
            
            return ResponseEntity.ok(userDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Cambia el estado de administrador de un usuario (toggle)
     */
    @PostMapping("/users/{userId}/toggle-admin")
    public ResponseEntity<UserDto> toggleAdminStatus(@PathVariable Long userId) {
        try {
            User updatedUser = adminService.toggleAdminStatus(userId);
            UserDto userDto = new UserDto(
                updatedUser.getId(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail(),
                updatedUser.getIsAdmin()
            );
            
            return ResponseEntity.ok(userDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Verifica si un usuario es administrador
     */
    @GetMapping("/users/{userId}/is-admin")
    public ResponseEntity<Boolean> isUserAdmin(@PathVariable Long userId) {
        try {
            boolean isAdmin = adminService.isUserAdmin(userId);
            return ResponseEntity.ok(isAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 