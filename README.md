# Proyecto: AutoRent DH

## 01. Documentación / Bitácora

### Definición del Proyecto
*   **Solución desarrollada**: AutoRent DH es una aplicación web diseñada para facilitar la renta de vehículos. Permite a los usuarios buscar, seleccionar y (eventualmente) reservar vehículos de acuerdo con la disponibilidad en fechas específicas, ofreciendo una plataforma intuitiva tanto para clientes como para administradores.

### Funcionalidades Implementadas (Frontend)
*   **Home Page**:
    *   Visualización de productos (vehículos) destacados con paginación (8 por página).
    *   Secciones placeholder para Buscador y Categorías.
*   **Detalle de Producto (Vehículo)**:
    *   Visualización de información detallada del vehículo.
    *   Galería de imágenes con miniaturas y una imagen principal.
    *   Modal para ver galería de imágenes completa con navegación.
*   **Panel de Administración (`/administracion`)**:
    *   Acceso restringido a vistas no móviles.
    *   Menú de administración:
        *   Enlace para "Agregar Nuevo Producto (Vehículo)" (dirige a `/admin/add-product`).
        *   Enlace para "Lista de productos (Vehículos)" (dirige a `/administracion/productos`).
*   **Gestión de Productos (Vehículos - Admin)**:
    *   **Agregar Producto (`/admin/add-product`)**: Formulario para agregar nuevos vehículos (funcionalidad de UI, sin conexión a backend real).
    *   **Listar Productos (`/administracion/productos`)**:
        *   Tabla con Id, Nombre y Acciones para cada vehículo.
        *   Acceso restringido a vistas no móviles.
    *   **Eliminar Producto**:
        *   Botón "Eliminar" en la lista de vehículos del admin.
        *   Mensaje de confirmación antes de eliminar.
        *   La eliminación se refleja en toda la aplicación (simulada en el estado de React, no persistente).
*   **Componentes Reutilizables**:
    *   Header con logo y navegación básica.
    *   Footer con información de copyright.
    *   ProductCard para mostrar información resumida de vehículos.

### Tecnologías Utilizadas (Frontend)
*   **Framework/Librería**: React (con Vite como herramienta de desarrollo)
*   **Routing**: React Router DOM
*   **Estilos**: CSS plano (con archivos `.css` por componente)
*   **Gestión de Estado (básica)**: Hooks de React (`useState`, `useEffect`)
*   **Datos**: `mockProducts.js` (simulación de base de datos en frontend para vehículos)

### Instrucciones para Levantar el Proyecto (Frontend)
1.  Clonar el repositorio (si aplica).
2.  Navegar al directorio `frontend`: `cd frontend`
3.  Instalar dependencias: `npm install`
4.  Ejecutar el servidor de desarrollo: `npm run dev`
5.  Abrir el navegador en la dirección indicada (usualmente `http://localhost:5173`).

## 02. Diseño de Identidad de Marca

### Logo
*   _(Pendiente de definir/integrar)_

### Paleta de Colores de Identidad (Propuesta basada en imagen)
*   `#ecd4c6` (Beige Rosado Claro) - Usado potencialmente para fondos suaves o elementos secundarios.
*   `#e3b155` (Mostaza / Dorado) - Acento, botones de acción importantes.
*   `#27242a` (Gris Muy Oscuro / Casi Negro) - Texto principal, elementos de alto contraste.
*   `#f4e7d5` (Beige Muy Claro / Blanco Hueso) - Fondo principal de secciones.
*   `#84b09b` (Verde Agave / Salvia) - Acento secundario, indicadores de éxito, elementos relacionados con la naturaleza o disponibilidad.

_(Nota: Esta paleta es una propuesta. Se puede refinar e integrar progresivamente en los CSS de la aplicación.)_

## 03. Mejoras Implementadas (Feedback del Proyecto Final)

### Backend - Seguridad y Documentación
*   **✅ Credenciales protegidas**: Migración de credenciales hardcodeadas a variables de entorno
*   **✅ Documentación completa**: README específico del backend con:
    *   Configuración de variables de entorno
    *   Documentación completa de endpoints de la API
    *   Instrucciones de instalación y configuración
    *   Ejemplos de request y response para todos los endpoints

### Frontend - Experiencia de Usuario
*   **✅ Sistema de notificaciones mejorado**: Implementación de SweetAlert2
    *   Reemplazo de todos los `alert()` nativos
    *   Notificaciones toast personalizadas
    *   Modales de confirmación elegantes
    *   Mensajes de éxito/error consistentes
*   **✅ Navegación corregida**: Acceso completo al menú de usuario desde cualquier página
*   **✅ Error Boundary**: Manejo robusto de errores React con componente ErrorBoundary
*   **✅ Autenticación en reservas**: Headers de autorización agregados para endpoints protegidos

### Panel de Administración - Funcionalidad Completa
*   **✅ Categorías en listado de productos**: Visualización correcta de categorías en AdminProductListPage
*   **✅ Gestión de categorías mejorada**: 
    *   Actualización visual automática al agregar/eliminar categorías
    *   Integración con API real y fallback a datos mock
    *   Navegación corregida entre páginas de administración
*   **✅ EditProductPage protegido**: Manejo seguro de productos con diferentes estructuras de datos
*   **✅ Notificaciones en admin**: Feedback visual consistente en todas las operaciones

### Correcciones Técnicas
*   **✅ Endpoints de reservas**: Corrección del endpoint `/api/reservations` (anteriormente `/api/auth/reservations`)
*   **✅ Compatibilidad de datos**: Manejo de productos con estructura de backend vs. mock data
*   **✅ Gestión de errores**: Implementación de try-catch y manejo graceful de errores de API
*   **✅ UX mejorada**: Confirmaciones elegantes para eliminaciones y acciones críticas

### Configuración y Documentación
*   **✅ Variables de entorno**: Archivo `.env.example` con todas las configuraciones necesarias
*   **✅ Documentación de API**: Endpoints completos con ejemplos para testing
*   **✅ Instrucciones de setup**: Guías paso a paso para configuración local
*   **✅ Manejo de errores**: Documentación de códigos de estado HTTP y respuestas de error

### Estado del Proyecto
*   ✅ **Backend**: Funcional con API completa y documentada
*   ✅ **Frontend**: Interfaz de usuario completa con navegación fluida  
*   ✅ **Admin Panel**: Gestión completa de productos, categorías y usuarios
*   ✅ **Autenticación**: Sistema de login/registro funcional
*   ✅ **Reservas**: Sistema de reservas con verificación de disponibilidad
*   ✅ **Experiencia de Usuario**: Notificaciones elegantes y manejo de errores

---

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
