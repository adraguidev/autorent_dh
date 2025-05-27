package com.autorent.backend.service;

import com.autorent.backend.model.User;
import com.autorent.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final UserRepository userRepository;

    @Autowired
    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Obtiene todos los usuarios registrados
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Obtiene un usuario por ID
     */
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    /**
     * Asigna permisos de administrador a un usuario
     */
    public User grantAdminPermissions(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Error: Usuario no encontrado!");
        }
        
        User user = userOptional.get();
        user.setIsAdmin(true);
        
        return userRepository.save(user);
    }

    /**
     * Revoca permisos de administrador a un usuario
     */
    public User revokeAdminPermissions(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Error: Usuario no encontrado!");
        }
        
        User user = userOptional.get();
        user.setIsAdmin(false);
        
        return userRepository.save(user);
    }

    /**
     * Verifica si un usuario es administrador
     */
    public boolean isUserAdmin(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isEmpty()) {
            return false;
        }
        
        return userOptional.get().getIsAdmin();
    }

    /**
     * Cambia el estado de administrador de un usuario (toggle)
     */
    public User toggleAdminStatus(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Error: Usuario no encontrado!");
        }
        
        User user = userOptional.get();
        user.setIsAdmin(!user.getIsAdmin());
        
        return userRepository.save(user);
    }
} 