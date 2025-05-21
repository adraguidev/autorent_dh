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

## 03. Planificación y Ejecución de los Tests

### Casos de Prueba Planeados (basados en Historias de Usuario implementadas)

*   **Paginación de Vehículos (Home)**:
    *   Verificar que se muestran N vehículos en la primera página.
    *   Verificar que los botones "Siguiente", "Anterior", "Inicio" y números de página funcionan.
    *   Verificar que los botones se deshabilitan correctamente en los extremos (primera/última página).
*   **Panel de Administración (Acceso)**:
    *   Verificar que se puede acceder a `/administracion` en vista de escritorio.
    *   Verificar que se muestra el mensaje "no disponible en móvil" en vistas móviles.
*   **Panel de Administración (Menú)**:
    *   Verificar que los enlaces del menú ("Agregar Nuevo Vehículo", "Lista de Vehículos") dirigen a las rutas correctas.
*   **Listar Vehículos (Admin)**:
    *   Verificar que la tabla muestra "Id", "Nombre", "Acciones".
    *   Verificar que todos los vehículos del mock se listan.
*   **Eliminar Vehículo (Admin)**:
    *   Verificar que al pulsar "Eliminar" aparece un mensaje de confirmación.
    *   Si se cancela, verificar que el vehículo no se elimina.
    *   Si se acepta, verificar que el vehículo se elimina de la lista de admin.
    *   Verificar que el vehículo eliminado ya no aparece en la Home (Vehículos Destacados).
    *   Verificar que al intentar acceder a la página de detalle del vehículo eliminado se muestra "Vehículo no encontrado".
*   **Agregar Vehículo (Admin)**:
    *   Verificar que el formulario en `/admin/add-product` se renderiza correctamente.
    *   _(Pruebas de funcionalidad de guardado pendientes de implementación de lógica de backend o estado global)_
*   **Detalle de Vehículo**:
    *   Verificar que se muestra la información correcta del vehículo.
    *   Verificar que la galería de imágenes y el modal funcionan.

### Ejecución de Casos de Prueba
*   _(Actualmente se realizan pruebas manuales exploratorias después de cada desarrollo de funcionalidad)._
*   _(Pendiente de definir e implementar un framework de testing automatizado como Jest y React Testing Library)._

---
Este `README.md` es un documento vivo y se actualizará a medida que el proyecto evolucione.
