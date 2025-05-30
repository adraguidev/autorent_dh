import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import './ReservationHistory.css';

const ReservationHistory = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, active, completed, cancelled
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, startDate

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login?redirect=/reservations');
      return;
    }

    loadReservations();
  }, [isAuthenticated, navigate, user]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      setError('');
      const userReservations = await api.getUserReservations(user.id);
      setReservations(userReservations);
    } catch (error) {
      console.error('Error loading reservations:', error);
      setError('No se pudieron cargar las reservas. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { text: 'Pendiente', class: 'status-pending', icon: 'fas fa-clock' },
      CONFIRMED: { text: 'Confirmada', class: 'status-confirmed', icon: 'fas fa-check-circle' },
      ACTIVE: { text: 'Activa', class: 'status-active', icon: 'fas fa-play-circle' },
      COMPLETED: { text: 'Completada', class: 'status-completed', icon: 'fas fa-check-double' },
      CANCELLED: { text: 'Cancelada', class: 'status-cancelled', icon: 'fas fa-times-circle' }
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return (
      <span className={`status-badge ${config.class}`}>
        <i className={config.icon}></i>
        {config.text}
      </span>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysSinceReservation = (createdAt) => {
    const reservationDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - reservationDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    return `Hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
  };

  const getFilteredAndSortedReservations = () => {
    let filtered = reservations;

    // Filtrar por estado
    if (filter !== 'all') {
      filtered = filtered.filter(reservation => 
        reservation.status.toLowerCase() === filter.toLowerCase()
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'startDate':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  const handleCancelReservation = async (reservationId) => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      return;
    }

    try {
      await api.cancelReservation(reservationId);
      // Recargar reservas después de cancelar
      await loadReservations();
    } catch (error) {
      console.error('Error canceling reservation:', error);
      alert('No se pudo cancelar la reserva. Por favor, inténtalo de nuevo.');
    }
  };

  const canCancelReservation = (reservation) => {
    const startDate = new Date(reservation.startDate);
    const now = new Date();
    const daysDiff = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
    
    return reservation.status === 'CONFIRMED' && daysDiff > 0;
  };

  if (loading) {
    return (
      <div className="reservation-history-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando historial de reservas...</span>
        </div>
      </div>
    );
  }

  const filteredReservations = getFilteredAndSortedReservations();

  return (
    <div className="reservation-history-container">
      <div className="history-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-history"></i>
            Mi Historial de Reservas
          </h1>
          <p className="header-subtitle">
            Aquí puedes ver todas tus reservas pasadas y futuras
          </p>
        </div>
        
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{reservations.length}</span>
            <span className="stat-label">Total Reservas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {reservations.filter(r => r.status === 'CONFIRMED').length}
            </span>
            <span className="stat-label">Activas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {reservations.filter(r => r.status === 'COMPLETED').length}
            </span>
            <span className="stat-label">Completadas</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
          <button onClick={loadReservations} className="retry-btn">
            <i className="fas fa-redo"></i>
            Reintentar
          </button>
        </div>
      )}

      <div className="filters-section">
        <div className="filter-group">
          <label>Filtrar por estado:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas las reservas</option>
            <option value="pending">Pendientes</option>
            <option value="confirmed">Confirmadas</option>
            <option value="active">Activas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Ordenar por:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguas</option>
            <option value="startDate">Fecha de inicio</option>
          </select>
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-calendar-times"></i>
          </div>
          <h3>No hay reservas que mostrar</h3>
          <p>
            {filter === 'all' 
              ? 'Aún no has realizado ninguna reserva.'
              : `No tienes reservas con estado "${filter}".`
            }
          </p>
          <Link to="/" className="explore-btn">
            <i className="fas fa-search"></i>
            Explorar Productos
          </Link>
        </div>
      ) : (
        <div className="reservations-list">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-header">
                <div className="reservation-title">
                  <h3>{reservation.productName}</h3>
                  <span className="reservation-id">#{reservation.id}</span>
                </div>
                {getStatusBadge(reservation.status)}
              </div>

              <div className="reservation-content">
                <div className="reservation-details">
                  <div className="detail-group">
                    <div className="detail-item">
                      <i className="fas fa-calendar-alt"></i>
                      <div className="detail-content">
                        <span className="detail-label">Fecha de recogida</span>
                        <span className="detail-value">{formatDate(reservation.startDate)}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <i className="fas fa-calendar-check"></i>
                      <div className="detail-content">
                        <span className="detail-label">Fecha de entrega</span>
                        <span className="detail-value">{formatDate(reservation.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-item">
                      <i className="fas fa-clock"></i>
                      <div className="detail-content">
                        <span className="detail-label">Duración</span>
                        <span className="detail-value">{reservation.durationDays} días</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <i className="fas fa-euro-sign"></i>
                      <div className="detail-content">
                        <span className="detail-label">Total pagado</span>
                        <span className="detail-value price">{formatPrice(reservation.totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-group">
                    <div className="detail-item">
                      <i className="fas fa-calendar-plus"></i>
                      <div className="detail-content">
                        <span className="detail-label">Reservado</span>
                        <span className="detail-value">{getDaysSinceReservation(reservation.createdAt)}</span>
                      </div>
                    </div>
                    
                    {reservation.notes && (
                      <div className="detail-item">
                        <i className="fas fa-sticky-note"></i>
                        <div className="detail-content">
                          <span className="detail-label">Notas</span>
                          <span className="detail-value">{reservation.notes}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="reservation-actions">
                  <Link 
                    to={`/product/${reservation.productId}`}
                    className="action-btn view-product-btn"
                  >
                    <i className="fas fa-eye"></i>
                    Ver Producto
                  </Link>
                  
                  {canCancelReservation(reservation) && (
                    <button
                      onClick={() => handleCancelReservation(reservation.id)}
                      className="action-btn cancel-btn"
                    >
                      <i className="fas fa-times"></i>
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationHistory; 