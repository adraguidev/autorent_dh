# AutoRent Backend

## Configuración del Proyecto

### Requisitos Previos
- Java 17 o superior
- MySQL 8.0 o superior
- Maven 3.6 o superior

### Variables de Entorno

Para configurar el proyecto localmente, crea un archivo `.env` en la raíz del proyecto backend con las siguientes variables:

```env
# Configuración de Base de Datos
DB_URL=jdbc:mysql://localhost:3306/autorent_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=tu_password_mysql

# Configuración de Email (Gmail SMTP)
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password_gmail

# Configuración de la Aplicación
APP_BASE_URL=http://localhost:5173
SUPPORT_EMAIL=support@autorent.com
```

### Configuración de MySQL

1. Instalar MySQL 8.0 o superior
2. Crear un usuario con permisos para crear bases de datos
3. La base de datos `autorent_db` se creará automáticamente al iniciar la aplicación

### Configuración de Email (Gmail)

Para el envío de correos electrónicos:

1. Crear una cuenta de Gmail o usar una existente
2. Habilitar la verificación en dos pasos
3. Generar una contraseña de aplicación específica
4. Usar esta contraseña en la variable `MAIL_PASSWORD`

### Ejecutar el Proyecto

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
./mvnw clean install

# Ejecutar la aplicación
./mvnw spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`