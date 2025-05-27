package com.autorent.backend.service;

import com.autorent.backend.dto.LoginRequestDto;
import com.autorent.backend.dto.LoginResponseDto;
import com.autorent.backend.dto.RegisterRequestDto;
import com.autorent.backend.model.User;
import com.autorent.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
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
        user.setIsAdmin(false); // Por defecto, nuevos usuarios no son administradores 

        User savedUser = userRepository.save(user);

        // Enviar email de confirmación de registro
        try {
            emailService.sendRegistrationConfirmationEmail(
                savedUser.getEmail(),
                savedUser.getFirstName(),
                savedUser.getLastName()
            );
            logger.info("Email de confirmación enviado exitosamente a: {}", savedUser.getEmail());
        } catch (Exception e) {
            logger.error("Error al enviar email de confirmación a {}: {}", savedUser.getEmail(), e.getMessage());
            // No lanzamos excepción para no afectar el registro, solo logueamos el error
        }

        return savedUser;
    }

    public LoginResponseDto loginUser(LoginRequestDto loginRequestDto) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequestDto.getEmail());
        
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Error: Usuario no encontrado!");
        }
        
        User user = userOptional.get();
        
        if (!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Error: Contraseña incorrecta!");
        }
        
        return new LoginResponseDto(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getIsAdmin(),
            "Login exitoso"
        );
    }

    public void resendConfirmationEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Error: Usuario no encontrado con el email proporcionado!");
        }
        
        User user = userOptional.get();
        
        try {
            emailService.sendRegistrationConfirmationEmail(
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
            );
            logger.info("Email de confirmación reenviado exitosamente a: {}", user.getEmail());
        } catch (Exception e) {
            logger.error("Error al reenviar email de confirmación a {}: {}", user.getEmail(), e.getMessage());
            throw new RuntimeException("Error al enviar el email de confirmación. Por favor, intenta más tarde.");
        }
    }
}
