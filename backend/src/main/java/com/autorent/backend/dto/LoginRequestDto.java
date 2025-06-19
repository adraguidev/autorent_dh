package com.autorent.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Datos requeridos para iniciar sesión")
public class LoginRequestDto {
    @Schema(description = "Email del usuario", example = "usuario@ejemplo.com", required = true)
    private String email;
    
    @Schema(description = "Contraseña del usuario", example = "mipassword123", required = true)
    private String password;
} 