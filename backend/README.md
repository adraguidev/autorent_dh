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

## Documentación de la API

### Autenticación

#### POST /api/auth/register
Registra un nuevo usuario.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente. Por favor, revisa tu email para confirmar tu cuenta."
}
```

#### POST /api/auth/login
Inicia sesión de usuario.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "token": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "role": "USER|ADMIN"
}
```

### Productos

#### GET /api/products
Obtiene todos los productos.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "string",
    "description": "string",
    "price": "string",
    "category": {
      "id": 1,
      "name": "string"
    },
    "imageUrls": ["string"],
    "characteristics": [
      {
        "id": 1,
        "name": "string"
      }
    ],
    "averageRating": 4.5,
    "reviewCount": 10
  }
]
```

#### GET /api/products/{id}
Obtiene un producto específico por ID.

**Response (200):**
```json
{
  "id": 1,
  "name": "string",
  "description": "string",
  "price": "string",
  "category": {
    "id": 1,
    "name": "string"
  },
  "imageUrls": ["string"],
  "characteristics": [
    {
      "id": 1,
      "name": "string"
    }
  ],
  "averageRating": 4.5,
  "reviewCount": 10
}
```

#### POST /api/products (Admin)
Crea un nuevo producto.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "string",
  "categoryId": 1,
  "imageUrls": ["string"],
  "characteristicIds": [1, 2, 3]
}
```

### Reservas

#### POST /api/reservations
Crea una nueva reserva.

**Request Body:**
```json
{
  "productId": 1,
  "userId": 1,
  "startDate": "2024-01-01",
  "endDate": "2024-01-05",
  "totalDays": 4,
  "totalPrice": 280.0
}
```

**Response (201):**
```json
{
  "id": 1,
  "productId": 1,
  "productName": "string",
  "userId": 1,
  "startDate": "2024-01-01",
  "endDate": "2024-01-05",
  "totalDays": 4,
  "totalPrice": 280.0,
  "status": "ACTIVE",
  "createdAt": "2024-01-01T10:00:00"
}
```

#### GET /api/reservations/user/{userId}
Obtiene todas las reservas de un usuario.

#### POST /api/products/{productId}/availability
Verifica disponibilidad de un producto.

**Request Body:**
```json
{
  "startDate": "2024-01-01",
  "endDate": "2024-01-05"
}
```

**Response (200):**
```json
{
  "available": true,
  "conflictingReservations": []
}
```

### Categorías

#### GET /api/categories
Obtiene todas las categorías.

#### POST /api/categories (Admin)
Crea una nueva categoría.

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

### Características

#### GET /api/characteristics
Obtiene todas las características.

#### POST /api/characteristics (Admin)
Crea una nueva característica.

**Request Body:**
```json
{
  "name": "string"
}
```

### Reseñas

#### GET /api/reviews/product/{productId}
Obtiene todas las reseñas de un producto.

#### POST /api/reviews
Crea una nueva reseña.

**Request Body:**
```json
{
  "productId": 1,
  "rating": 5,
  "comment": "string"
}
```

## Estados HTTP Comunes

- **200**: Éxito
- **201**: Creado exitosamente
- **400**: Solicitud incorrecta
- **401**: No autorizado
- **403**: Prohibido
- **404**: No encontrado
- **500**: Error interno del servidor

## Configuración de CORS

La aplicación está configurada para permitir solicitudes desde `http://localhost:5173` (frontend de desarrollo).

## Base de Datos

La aplicación usa MySQL con JPA/Hibernate. Las tablas se crean automáticamente al iniciar la aplicación.

### Datos de Prueba

Al iniciar la aplicación, se cargan datos de prueba automáticamente, incluyendo:
- Categorías de vehículos
- Características de vehículos
- Productos de prueba
- Usuario administrador de prueba

## Logs

Los logs de la aplicación se muestran en la consola durante el desarrollo. Para producción, se pueden configurar archivos de log específicos. 