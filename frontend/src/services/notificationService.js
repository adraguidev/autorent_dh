import Swal from 'sweetalert2';

// Configuración base para todos los modales
const baseConfig = {
  confirmButtonColor: '#e3b155',
  cancelButtonColor: '#84b09b',
  customClass: {
    popup: 'custom-swal-popup',
    title: 'custom-swal-title',
    content: 'custom-swal-content'
  }
};

export const NotificationService = {
  // Notificación de éxito
  success: (title, text = '') => {
    return Swal.fire({
      ...baseConfig,
      icon: 'success',
      title,
      text,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: false,
      position: 'center'
    });
  },

  // Notificación de error
  error: (title, text = '') => {
    return Swal.fire({
      ...baseConfig,
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Entendido'
    });
  },

  // Notificación de advertencia
  warning: (title, text = '') => {
    return Swal.fire({
      ...baseConfig,
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Ok'
    });
  },

  // Notificación de información
  info: (title, text = '') => {
    return Swal.fire({
      ...baseConfig,
      icon: 'info',
      title,
      text,
      confirmButtonText: 'Entendido'
    });
  },

  // Confirmación con opciones
  confirm: (title, text = '', confirmText = 'Sí', cancelText = 'Cancelar') => {
    return Swal.fire({
      ...baseConfig,
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true
    });
  },

  // Confirmación de eliminación
  confirmDelete: (itemName = 'este elemento') => {
    return Swal.fire({
      ...baseConfig,
      icon: 'warning',
      title: '¿Estás seguro?',
      text: `¿Realmente deseas eliminar ${itemName}? Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      reverseButtons: true
    });
  },

  // Toast para notificaciones ligeras
  toast: {
    success: (message) => {
      return Swal.fire({
        icon: 'success',
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#d4edda',
        color: '#155724'
      });
    },

    error: (message) => {
      return Swal.fire({
        icon: 'error',
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        background: '#f8d7da',
        color: '#721c24'
      });
    },

    info: (message) => {
      return Swal.fire({
        icon: 'info',
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#d1ecf1',
        color: '#0c5460'
      });
    }
  },

  // Modal de carga
  loading: (title = 'Cargando...') => {
    return Swal.fire({
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  },

  // Cerrar cualquier modal abierto
  close: () => {
    Swal.close();
  },

  // Modal personalizado para confirmación de reserva
  reservationSuccess: (productName, startDate, endDate, days) => {
    return Swal.fire({
      ...baseConfig,
      icon: 'success',
      title: '¡Reserva Confirmada!',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Producto:</strong> ${productName}</p>
          <p><strong>Fechas:</strong> ${startDate} - ${endDate}</p>
          <p><strong>Días:</strong> ${days}</p>
        </div>
      `,
      confirmButtonText: 'Ver mis reservas',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      reverseButtons: true
    });
  },

  // Modal para cuando se necesita login
  requireLogin: () => {
    return Swal.fire({
      ...baseConfig,
      icon: 'info',
      title: 'Inicio de sesión requerido',
      text: 'Debes iniciar sesión para realizar esta acción.',
      confirmButtonText: 'Iniciar sesión',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
  }
};

export default NotificationService; 