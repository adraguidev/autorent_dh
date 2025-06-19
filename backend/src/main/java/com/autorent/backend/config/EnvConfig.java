package com.autorent.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class EnvConfig {

    // Bloque estático que se ejecuta ANTES que Spring Boot lea las propiedades
    static {
        loadEnvironmentVariables();
    }

    private static void loadEnvironmentVariables() {
        try {
            // Cargar el archivo .env desde la raíz del proyecto
            // Intentar múltiples rutas para encontrar el archivo .env
            Dotenv dotenv = null;
            
            // Intentar cargar desde diferentes ubicaciones
            String[] possiblePaths = {"./", "../", "../../"};
            
            for (String path : possiblePaths) {
                try {
                    dotenv = Dotenv.configure()
                            .directory(path)
                            .ignoreIfMalformed()
                            .ignoreIfMissing()
                            .load();
                    
                    // Si encontramos variables, salimos del bucle
                    if (dotenv.entries().size() > 0) {
                        System.out.println("🔍 Archivo .env encontrado en: " + path);
                        break;
                    }
                } catch (Exception e) {
                    // Continuar con la siguiente ruta
                    continue;
                }
            }
            
            if (dotenv == null || dotenv.entries().size() == 0) {
                throw new RuntimeException("No se pudo encontrar o cargar el archivo .env");
            }

            // Variables requeridas
            String[] requiredVars = {
                "DB_URL", "DB_USERNAME", "DB_PASSWORD",
                "MAIL_USERNAME", "MAIL_PASSWORD", 
                "APP_BASE_URL", "SUPPORT_EMAIL"
            };

            // Establecer las variables de entorno en el sistema
            dotenv.entries().forEach(entry -> {
                String key = entry.getKey();
                String value = entry.getValue();
                
                // Solo establecer si no existe ya como variable de entorno del sistema
                if (System.getenv(key) == null && System.getProperty(key) == null) {
                    System.setProperty(key, value);
                    System.out.println("✅ Loaded env variable: " + key);
                }
            });
            
            // Validar que todas las variables requeridas estén presentes
            for (String var : requiredVars) {
                String value = System.getProperty(var);
                if (value == null || value.isEmpty()) {
                    throw new RuntimeException("❌ Variable de entorno requerida no encontrada: " + var);
                }
            }
            
            System.out.println("🔧 ✅ Todas las variables de entorno cargadas correctamente desde .env");
            
        } catch (Exception e) {
            System.err.println("❌ ERROR: " + e.getMessage());
            System.err.println("📋 Asegúrate de tener un archivo .env en la raíz del proyecto con todas las variables requeridas");
            throw new RuntimeException("Configuración de entorno inválida", e);
        }
    }

    @PostConstruct
    public void validateConfiguration() {
        System.out.println("🔧 ✅ Configuración de entorno validada correctamente");
    }
} 