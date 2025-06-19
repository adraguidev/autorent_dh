const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Productos
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Categorías
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async createCategory(categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  async updateCategory(id, categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  async deleteCategory(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  // Registro de usuarios
  async registerUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.text(); // El backend devuelve un mensaje de texto
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login de usuarios
  async loginUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.json(); // El backend devuelve un objeto LoginResponseDto
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  },

  // Obtener perfil actualizado del usuario
  async getUserProfile(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // === FUNCIONES DE ADMINISTRACIÓN ===

  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Obtener usuario por ID
  async getUserById(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Otorgar permisos de administrador
  async grantAdminPermissions(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/grant-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error granting admin permissions:', error);
      throw error;
    }
  },

  // Revocar permisos de administrador
  async revokeAdminPermissions(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/revoke-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error revoking admin permissions:', error);
      throw error;
    }
  },

  // Cambiar estado de administrador (toggle)
  async toggleAdminStatus(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/toggle-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error toggling admin status:', error);
      throw error;
    }
  },

  // Verificar si un usuario es administrador
  async isUserAdmin(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/is-admin`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking admin status:', error);
      throw error;
    }
  },

  // === FUNCIONES DE CARACTERÍSTICAS ===

  // Obtener todas las características
  async getCharacteristics() {
    try {
      const response = await fetch(`${API_BASE_URL}/characteristics`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching characteristics:', error);
      throw error;
    }
  },

  // Obtener característica por ID
  async getCharacteristicById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/characteristics/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching characteristic:', error);
      throw error;
    }
  },

  // Crear nueva característica
  async createCharacteristic(characteristicData) {
    try {
      const response = await fetch(`${API_BASE_URL}/characteristics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characteristicData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating characteristic:', error);
      throw error;
    }
  },

  // Actualizar característica
  async updateCharacteristic(id, characteristicData) {
    try {
      const response = await fetch(`${API_BASE_URL}/characteristics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characteristicData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating characteristic:', error);
      throw error;
    }
  },

  // Eliminar característica
  async deleteCharacteristic(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/characteristics/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting characteristic:', error);
      throw error;
    }
  },

  // === FUNCIONES DE EMAIL ===

  // Reenviar email de confirmación
  async resendConfirmationEmail(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-confirmation?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error resending confirmation email:', error);
      throw error;
    }
  },

  // === FUNCIONES DE BÚSQUEDA ===

  // Búsqueda avanzada de productos
  async searchProducts(query, categoryId, priceRange, startDate, endDate) {
    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (categoryId) params.append('categoryId', categoryId);
      if (priceRange) params.append('priceRange', priceRange);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await fetch(`${API_BASE_URL}/products/search?${params}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Obtener sugerencias de búsqueda
  async getSearchSuggestions(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/suggestions?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      throw error;
    }
  },

  // === FUNCIONES DE DISPONIBILIDAD Y RESERVAS ===

  // Obtener disponibilidad de un producto
  async getProductAvailability(productId, startDate, endDate) {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await fetch(`${API_BASE_URL}/products/${productId}/availability?${params}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product availability:', error);
      throw error;
    }
  },

  // Obtener fechas ocupadas de un producto
  async getProductBookedDates(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/booked-dates`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching booked dates:', error);
      // Retornar fechas mock si hay error
      return this.getMockBookedDates();
    }
  },

  // === FUNCIONES DE RESERVAS ===

  // Crear una nueva reserva
  async createReservation(reservationData) {
    try {
      // Obtener token del usuario autenticado si está disponible
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers,
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  // Obtener todas las reservas de un usuario
  async getUserReservations(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      throw error;
    }
  },

  // Obtener una reserva específica por ID
  async getReservationById(reservationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservation:', error);
      throw error;
    }
  },

  // Cancelar una reserva
  async cancelReservation(reservationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return response.status === 204; // No Content significa éxito
    } catch (error) {
      console.error('Error canceling reservation:', error);
      throw error;
    }
  },

  // Actualizar el estado de una reserva
  async updateReservationStatus(reservationId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/status?status=${status}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating reservation status:', error);
      throw error;
    }
  },

  // Verificar disponibilidad para fechas específicas
  async checkAvailability(productId, startDate, endDate) {
    try {
      // Formatear fechas sin zona horaria para evitar desfase
      const formatDateLocal = (date) => {
        if (typeof date === 'string') {
          // Si ya es string, asumir que está en formato correcto
          return date;
        }
        // Si es Date object, formatear localmente
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const startDateFormatted = formatDateLocal(startDate);
      const endDateFormatted = formatDateLocal(endDate);

      const response = await fetch(`${API_BASE_URL}/products/${productId}/check-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDateFormatted,
          endDate: endDateFormatted
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking availability:', error);
      // Retornar disponibilidad simulada si hay error
      return {
        available: true,
        message: 'Fechas disponibles (simulado)'
      };
    }
  },

  // === FUNCIONES DE FAVORITOS ===

  // Obtener favoritos del usuario
  async getFavorites(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/favorites`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  // Agregar producto a favoritos
  async addToFavorites(userId, productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/favorites/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  // Remover producto de favoritos
  async removeFromFavorites(userId, productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/favorites/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  },

  // Verificar si un producto está en favoritos
  async isFavorite(userId, productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/favorites/${productId}/check`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking favorite status:', error);
      throw error;
    }
  },

  // Funciones mock para pruebas
  getMockBookedDates() {
    // Generar algunas fechas ocupadas de ejemplo
    const today = new Date();
    const bookedDates = [];
    
    // Agregar algunas fechas ocupadas de ejemplo
    for (let i = 5; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      bookedDates.push(date.toISOString().split('T')[0]);
    }
    
    for (let i = 15; i < 18; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      bookedDates.push(date.toISOString().split('T')[0]);
    }

    return bookedDates;
  },

  async searchProductsByDateRange(startDate, endDate) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/search-by-dates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching products by date range:', error);
      throw error;
    }
  },

  // ================================================================
  // RESEÑAS Y PUNTUACIONES - NUEVAS FUNCIONES
  // ================================================================

  // Crear una nueva reseña
  async createReview(reviewData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // Obtener todas las reseñas de un producto
  async getProductReviews(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/product/${productId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting product reviews:', error);
      throw error;
    }
  },

  // Obtener todas las reseñas de un usuario
  async getUserReviews(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting user reviews:', error);
      throw error;
    }
  },

  // Obtener la reseña específica de un usuario para un producto
  async getUserReview(userId, productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/user/${userId}/product/${productId}`);
      if (response.status === 404) {
        return null; // No existe reseña
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting user review:', error);
      throw error;
    }
  },

  // Obtener estadísticas de puntuación de un producto
  async getProductRatingStats(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/product/${productId}/stats`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting product rating stats:', error);
      throw error;
    }
  },

  // Actualizar una reseña existente
  async updateReview(reviewId, reviewData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  // Eliminar una reseña
  async deleteReview(reviewId, userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}?userId=${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }
}; 