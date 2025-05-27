package com.autorent.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password; // La contraseña en texto plano, se hasheará en el backend
}
