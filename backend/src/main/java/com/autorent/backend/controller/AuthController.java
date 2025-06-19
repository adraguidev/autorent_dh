package com.autorent.backend.controller;

import com.autorent.backend.dto.LoginRequestDto;
import com.autorent.backend.dto.LoginResponseDto;
import com.autorent.backend.dto.RegisterRequestDto;
import com.autorent.backend.dto.UserDto;
import com.autorent.backend.model.User;
import com.autorent.backend.service.AuthService;
import com.autorent.backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Autenticación", description = "Operaciones de autenticación y gestión de usuarios")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @Autowired
    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @Operation(
        summary = "Registrar nuevo usuario",
        description = "Crea una nueva cuenta de usuario en el sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Usuario registrado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos o email ya existe")
    })
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @Parameter(description = "Datos del nuevo usuario") @RequestBody RegisterRequestDto registerRequestDto) {
        try {
            User registeredUser = authService.registerUser(registerRequestDto);
            // Podríamos devolver un DTO del usuario si no queremos exponer la entidad User directamente
            // Por ahora, devolvemos un mensaje de éxito.
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente! ID: " + registeredUser.getId());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(
        summary = "Iniciar sesión",
        description = "Autentica a un usuario y devuelve un token JWT"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login exitoso",
                content = @Content(schema = @Schema(implementation = LoginResponseDto.class))),
        @ApiResponse(responseCode = "401", description = "Credenciales inválidas")
    })
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
            @Parameter(description = "Credenciales de login") @RequestBody LoginRequestDto loginRequestDto) {
        try {
            LoginResponseDto loginResponse = authService.loginUser(loginRequestDto);
            return ResponseEntity.ok(loginResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/resend-confirmation")
    public ResponseEntity<?> resendConfirmationEmail(@RequestParam String email) {
        try {
            authService.resendConfirmationEmail(email);
            return ResponseEntity.ok("Email de confirmación enviado exitosamente a: " + email);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener el perfil del usuario");
        }
    }
}
