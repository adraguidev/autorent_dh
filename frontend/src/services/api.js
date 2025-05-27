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
        throw new Error(`Error: ${response.status}`);
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
  async searchProducts(query, categoryId, priceRange) {
    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (categoryId) params.append('categoryId', categoryId);
      if (priceRange) params.append('priceRange', priceRange);

      const response = await fetch(`${API_BASE_URL}/products/search?${params.toString()}`);
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
      if (!query || query.length < 2) {
        return [];
      }
      const response = await fetch(`${API_BASE_URL}/products/suggestions?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      return [];
    }
  }
}; 