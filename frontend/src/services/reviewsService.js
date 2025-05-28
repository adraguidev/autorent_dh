// Servicio para gestionar las reseñas de productos
class ReviewsService {
  constructor() {
    this.reviews = new Map(); // Almacenar reseñas por productId
    this.initializeMockData();
  }

  initializeMockData() {
    // Datos mock para diferentes productos
    const mockReviewsData = {
      1: [
        {
          id: 1,
          userId: 1,
          userName: 'María González',
          rating: 4,
          comment: 'Muy buen vehículo para la ciudad. Consumo excelente y muy fácil de manejar.',
          date: '2024-01-15',
          verified: true
        },
        {
          id: 2,
          userId: 2,
          userName: 'Carlos Rodríguez',
          rating: 5,
          comment: 'Perfecto para mis necesidades diarias. Lo recomiendo completamente.',
          date: '2024-01-10',
          verified: true
        }
      ],
      2: [
        {
          id: 3,
          userId: 3,
          userName: 'Ana Martínez',
          rating: 5,
          comment: 'Excelente para viajes familiares. Muy cómodo y espacioso.',
          date: '2024-01-12',
          verified: true
        },
        {
          id: 4,
          userId: 4,
          userName: 'Luis Fernández',
          rating: 4,
          comment: 'Muy buen sedán, aunque el consumo podría ser mejor.',
          date: '2024-01-08',
          verified: true
        }
      ],
      3: [
        {
          id: 5,
          userId: 5,
          userName: 'Elena Ruiz',
          rating: 5,
          comment: 'Increíble SUV, perfecto para aventuras off-road. Muy potente.',
          date: '2024-01-14',
          verified: true
        }
      ],
      4: [
        {
          id: 6,
          userId: 6,
          userName: 'Roberto Silva',
          rating: 5,
          comment: 'Un sueño hecho realidad. Excelente experiencia de conducción.',
          date: '2024-01-11',
          verified: true
        },
        {
          id: 7,
          userId: 7,
          userName: 'Patricia López',
          rating: 5,
          comment: 'Perfecto para una ocasión especial. Calidad premium.',
          date: '2024-01-09',
          verified: true
        }
      ]
    };

    // Inicializar el Map con los datos mock
    Object.entries(mockReviewsData).forEach(([productId, reviews]) => {
      this.reviews.set(parseInt(productId), reviews);
    });
  }

  // Obtener reseñas de un producto específico
  async getProductReviews(productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const productReviews = this.reviews.get(parseInt(productId)) || [];
        resolve(productReviews);
      }, 500); // Simular delay de red
    });
  }

  // Agregar una nueva reseña
  async addReview(productId, reviewData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const productIdInt = parseInt(productId);
          const existingReviews = this.reviews.get(productIdInt) || [];
          
          // Verificar si el usuario ya ha reseñado este producto
          const userHasReviewed = existingReviews.some(
            review => review.userId === reviewData.userId
          );
          
          if (userHasReviewed) {
            reject(new Error('Ya has reseñado este producto'));
            return;
          }

          const newReview = {
            id: Date.now(), // ID simple para el mock
            userId: reviewData.userId,
            userName: reviewData.userName,
            rating: reviewData.rating,
            comment: reviewData.comment || '',
            date: new Date().toISOString().split('T')[0],
            verified: true
          };

          const updatedReviews = [newReview, ...existingReviews];
          this.reviews.set(productIdInt, updatedReviews);
          
          resolve(newReview);
        } catch (error) {
          reject(error);
        }
      }, 1000); // Simular delay de red
    });
  }

  // Calcular estadísticas de reseñas para un producto
  async getProductRatingStats(productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const productReviews = this.reviews.get(parseInt(productId)) || [];
        
        if (productReviews.length === 0) {
          resolve({
            averageRating: 0,
            totalReviews: 0,
            ratingDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
          });
          return;
        }

        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / productReviews.length;
        
        const ratingDistribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        productReviews.forEach(review => {
          ratingDistribution[review.rating]++;
        });

        resolve({
          averageRating: Math.round(averageRating * 10) / 10, // Redondear a 1 decimal
          totalReviews: productReviews.length,
          ratingDistribution
        });
      }, 300); // Simular delay de red
    });
  }

  // Verificar si un usuario puede reseñar un producto (mock: siempre true por ahora)
  async canUserReview(userId, productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // En una implementación real, verificaríamos si el usuario ha completado una reserva
        resolve(true);
      }, 200);
    });
  }

  // Obtener reseña de un usuario específico para un producto
  async getUserReview(userId, productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const productReviews = this.reviews.get(parseInt(productId)) || [];
        const userReview = productReviews.find(review => review.userId === userId);
        resolve(userReview || null);
      }, 300);
    });
  }
}

// Exportar una instancia singleton
export const reviewsService = new ReviewsService(); 