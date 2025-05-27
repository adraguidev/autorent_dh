package com.autorent.backend.controller;

import com.autorent.backend.dto.RegisterRequestDto;
import com.autorent.backend.model.User;
import com.autorent.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDto registerRequestDto) {
        try {
            User registeredUser = authService.registerUser(registerRequestDto);
            // Podríamos devolver un DTO del usuario si no queremos exponer la entidad User directamente
            // Por ahora, devolvemos un mensaje de éxito.
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente! ID: " + registeredUser.getId());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Aquí iría el endpoint de login en el futuro
    // @PostMapping("/login")
    // public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequestDto) {
    //     // ... Lógica de autenticación ...
    // }
}
