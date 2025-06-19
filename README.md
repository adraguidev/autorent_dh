# AutoRent DH - Sistema de Alquiler de Vehículos

**Nombre de alumno:** Adrian Aguirre Barrionuevo

---

## 📋 Descripción del Proyecto

AutoRent DH es una aplicación web completa para el alquiler de vehículos, desarrollada con React + Vite en el frontend y Spring Boot en el backend. La aplicación permite a los usuarios buscar, visualizar y reservar vehículos, mientras que los administradores pueden gestionar el inventario y las reservas.

## 🚀 Configuración y Instalación

### Requisitos Previos

- **Java 17** o superior
- **Node.js 18** o superior
- **MySQL 8.0** o superior
- **Maven 3.6** o superior

### 1. Configuración del Backend

#### Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con la siguiente configuración:

```env
# ===============================================
# CONFIGURACIÓN DE BASE DE DATOS
# ===============================================
DB_URL=jdbc:mysql://localhost:3306/autorent_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=tu_password_mysql

# ===============================================
# CONFIGURACIÓN DE EMAIL (Gmail SMTP)
# ===============================================
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password_gmail

# ===============================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ===============================================
APP_BASE_URL=http://localhost:5173
SUPPORT_EMAIL=support@autorent.com

# ===============================================
# CONFIGURACIÓN DE SEGURIDAD JWT
# ===============================================
JWT_SECRET=mi_clave_secreta_jwt_muy_segura_2024
JWT_EXPIRATION=86400000
```

#### Configuración de MySQL

1. **Instalar MySQL 8.0+**
   ```bash
   # En Ubuntu/Debian
   sudo apt update
   sudo apt install mysql-server
   
   # En macOS (con Homebrew)
   brew install mysql
   
   # En Windows: Descargar desde https://dev.mysql.com/downloads/mysql/
   ```

2. **Configurar usuario y permisos**
   ```sql
   -- Conectar como root
   mysql -u root -p
   
   -- Crear usuario (opcional, puedes usar root)
   CREATE USER 'autorent'@'localhost' IDENTIFIED BY 'password123';
   GRANT ALL PRIVILEGES ON *.* TO 'autorent'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **La base de datos se crea automáticamente** al iniciar la aplicación gracias a `createDatabaseIfNotExist=true`

#### Configuración de Email (Gmail)

Para habilitar el envío de correos de confirmación:

1. **Usar una cuenta de Gmail** (recomendado crear una específica para la app)
2. **Habilitar verificación en dos pasos**:
   - Ir a [myaccount.google.com](https://myaccount.google.com)
   - Seguridad → Verificación en dos pasos → Activar
3. **Generar contraseña de aplicación**:
   - Seguridad → Verificación en dos pasos → Contraseñas de aplicaciones
   - Seleccionar "Correo" y el dispositivo
   - Copiar la contraseña generada (16 caracteres)
4. **Usar en el archivo .env**:
   ```env
   MAIL_USERNAME=tucuenta@gmail.com
   MAIL_PASSWORD=abcd efgh ijkl mnop  # La contraseña de aplicación
   ```

#### Ejecutar el Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias y compilar
./mvnw clean install

# Ejecutar la aplicación
./mvnw spring-boot:run
```

**El backend estará disponible en:** `http://localhost:8080`

### 2. Configuración del Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

**El frontend estará disponible en:** `http://localhost:5173`

## 🗄️ Inicialización de la Base de Datos

### Datos de Prueba Automáticos

La aplicación incluye un sistema de inicialización automática que:

1. **Detecta si la base de datos está vacía**
2. **Carga datos de prueba automáticamente**:
   - 6 categorías de vehículos
   - 10+ características (GPS, A/C, Bluetooth, etc.)
   - 8 productos de ejemplo con imágenes reales
   - Usuario administrador por defecto

### Credenciales de Administrador

**¡IMPORTANTE!** Se crea automáticamente un usuario administrador con estas credenciales:

```
Email: admin@autorent.com
Contraseña: password
```

**Accede al panel de administración:**
1. Inicia sesión con las credenciales anteriores
2. Ve a: `http://localhost:5173/administracion`

### Scripts de Migración Alternativos

Si prefieres inicializar manualmente, tienes estas opciones:

```bash
# Opción 1: Script completo (en backend/src/main/resources/)
mysql -u root -p autorent_db < init_complete_database.sql

# Opción 2: Backup completo con datos de prueba
mysql -u root -p autorent_db < backup_complete_autorent.sql
```

## 📱 Funcionalidades Principales

### Para Usuarios
- ✅ **Registro y autenticación** con confirmación por email
- ✅ **Búsqueda y filtrado** de vehículos por categoría y características
- ✅ **Visualización detallada** con galería de imágenes
- ✅ **Sistema de reservas** con verificación de disponibilidad
- ✅ **Gestión de favoritos** y perfil personal
- ✅ **Historial de reservas** y valoraciones

### Para Administradores
- ✅ **Panel de administración** completo
- ✅ **Gestión de productos** (crear, editar, eliminar vehículos)
- ✅ **Gestión de categorías** y características
- ✅ **Administración de usuarios** y roles
- ✅ **Supervisión de reservas** y reportes

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** con Vite
- **React Router DOM** para navegación
- **SweetAlert2** para notificaciones elegantes
- **CSS Modules** para estilos

### Backend
- **Spring Boot 3.2**
- **Spring Security** con JWT
- **Spring Data JPA** con Hibernate
- **MySQL** como base de datos
- **Spring Mail** para envío de correos
- **Swagger/OpenAPI 3** para documentación interactiva de API

## 📚 Documentación de API con Swagger

### 🔗 Acceso a Swagger UI

El proyecto incluye **Swagger/OpenAPI 3** para documentación interactiva completa de todos los endpoints. Con el backend ejecutándose, puedes acceder a:

🌐 **Swagger UI:** [`http://localhost:8080/swagger-ui.html`](http://localhost:8080/swagger-ui.html)

### ✨ Características de Swagger
- ✅ **Documentación interactiva** de todos los endpoints
- ✅ **Autenticación JWT integrada** - puedes probar endpoints protegidos
- ✅ **Ejemplos de request/response** para cada endpoint
- ✅ **Validación en tiempo real** de parámetros
- ✅ **Descarga de especificación OpenAPI** en formato JSON/YAML

### 🔐 Cómo usar Swagger con Autenticación

1. **Inicia sesión** usando el endpoint `/api/auth/login`
2. **Copia el token JWT** de la respuesta
3. **Haz clic en "Authorize"** en la parte superior de Swagger UI
4. **Pega el token** en el campo "Bearer Token"
5. **¡Listo!** Ahora puedes probar todos los endpoints protegidos

### Endpoints Principales

```
🔐 Autenticación
POST /api/auth/register          # Registro de usuario
POST /api/auth/login             # Iniciar sesión
GET  /api/auth/profile           # Perfil del usuario

🚗 Productos
GET    /api/products             # Listar todos los productos
GET    /api/products/{id}        # Detalle de producto
POST   /api/products             # Crear producto (Admin)
PUT    /api/products/{id}        # Actualizar producto (Admin)
DELETE /api/products/{id}        # Eliminar producto (Admin)

📅 Reservas
POST /api/reservations           # Crear reserva
GET  /api/reservations/user      # Reservas del usuario
POST /api/products/{id}/availability  # Verificar disponibilidad

⭐ Favoritos
GET    /api/favorites            # Productos favoritos
POST   /api/favorites/{productId}     # Agregar a favoritos
DELETE /api/favorites/{productId}     # Quitar de favoritos

👥 Administración
GET  /api/admin/users            # Gestión de usuarios (Admin)
GET  /api/categories             # Gestión de categorías
GET  /api/characteristics        # Gestión de características
```

## 🔧 Solución de Problemas

### Errores Comunes

1. **Error de conexión a MySQL**
   ```
   Solución: Verificar que MySQL esté ejecutándose y las credenciales sean correctas
   ```

2. **Error 404 en el frontend**
   ```
   Solución: Asegurarse de que el backend esté ejecutándose en puerto 8080
   ```

3. **Emails no se envían**
   ```
   Solución: Verificar configuración de Gmail y contraseña de aplicación
   ```

4. **Datos no se cargan**
   ```
   Solución: Verificar logs del backend para errores de inicialización
   ```

### Logs Útiles

```bash
# Ver logs del backend
tail -f backend/logs/application.log

# Ver errores de compilación
./mvnw clean install -X
```

## 🤝 Contribución

Este proyecto fue desarrollado como parte del curso de Digital House. Para contribuir:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto es parte de un ejercicio académico de Digital House.

---

**Desarrollado por:** Adrian Aguirre Barrionuevo  
**Curso:** Certified Full Stack Developer - Digital House  
**Año:** 2024
