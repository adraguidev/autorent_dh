package com.autorent.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users") // Asegúrate de que el nombre de la tabla sea plural o el estándar que uses
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // La contraseña se almacenará hasheada

    // Podríamos añadir roles u otra información del usuario aquí en el futuro
    // private String role; // Ejemplo: "USER", "ADMIN"
}
