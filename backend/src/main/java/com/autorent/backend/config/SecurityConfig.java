package com.autorent.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Habilitar y configurar CORS
            .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF para APIs stateless
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // No crear sesiones
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll() // Permitir todo en /api/auth/** (registro, login)
                .requestMatchers("/api/products/**").permitAll() // Permitir endpoints de productos (temporalmente todos los métodos)
                .requestMatchers("/api/categories/**").permitAll() // Permitir endpoints de categorías (temporalmente todos los métodos)
                .requestMatchers("/api/characteristics/**").permitAll() // Permitir endpoints de características (temporalmente para pruebas)
                .requestMatchers("/api/admin/**").permitAll() // Permitir endpoints de administración (temporalmente para pruebas)
                .requestMatchers("/api/reviews/**").permitAll() // Permitir endpoints de reseñas (temporalmente para pruebas)
                .requestMatchers("/api/reservations/**").permitAll() // Permitir endpoints de reservas (temporalmente para pruebas)
                .requestMatchers("/api/users/**").permitAll() // Permitir endpoints de usuarios/favoritos (temporalmente para pruebas)
                // Permitir acceso a Swagger/OpenAPI
                .requestMatchers("/swagger-ui/**").permitAll() // Swagger UI
                .requestMatchers("/swagger-ui.html").permitAll() // Swagger UI HTML
                .requestMatchers("/v3/api-docs/**").permitAll() // OpenAPI 3 docs
                .requestMatchers("/v3/api-docs.yaml").permitAll() // OpenAPI YAML
                .requestMatchers("/swagger-resources/**").permitAll() // Swagger resources
                .requestMatchers("/webjars/**").permitAll() // Webjars (dependencias de Swagger UI)
                .anyRequest().authenticated() // Todas las demás rutas requieren autenticación (se configurará JWT más adelante)
            );
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Asegúrate de que los puertos coincidan con los que usa tu frontend en desarrollo
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5173")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true); // Importante si manejas cookies o sesiones autenticadas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplicar CORS a todas las rutas
        return source;
    }
}
