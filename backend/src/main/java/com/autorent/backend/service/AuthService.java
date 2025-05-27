package com.autorent.backend.service;

import com.autorent.backend.dto.RegisterRequestDto;
import com.autorent.backend.model.User;
import com.autorent.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequestDto registerRequestDto) {
        if (userRepository.existsByEmail(registerRequestDto.getEmail())) {
            // Considerar lanzar una excepción específica aquí para manejarla en el controlador
            throw new IllegalArgumentException("Error: El correo electrónico ya está en uso!");
        }

        User user = new User();
        user.setFirstName(registerRequestDto.getFirstName());
        user.setLastName(registerRequestDto.getLastName());
        user.setEmail(registerRequestDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
        // Aquí se podrían asignar roles por defecto si los tuviéramos
        // user.setRole("ROLE_USER"); 

        return userRepository.save(user);
    }
}
