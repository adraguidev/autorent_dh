import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { api } from '../services/api';
import './AvailabilityCalendar.css';

// Registrar localización en español
registerLocale('es', es);

const AvailabilityCalendar = ({ productId, onDateSelect, onReservationRequest }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState(null);

  // Cargar fechas ocupadas al montar el componente
  useEffect(() => {
    loadBookedDates();
  }, [productId]);

  // Notificar cambios de fechas al componente padre
  useEffect(() => {
    if (onDateSelect) {
      onDateSelect({ startDate, endDate });
    }
  }, [startDate, endDate, onDateSelect]);

  const loadBookedDates = async () => {
    try {
      setLoading(true);
      setError(null);
      const dates = await api.getProductBookedDates(productId);
      setBookedDates(dates.map(date => new Date(date)));
    } catch (error) {
      console.error('Error loading booked dates:', error);
      setError('No se pudieron cargar las fechas ocupadas. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async () => {
    if (!startDate || !endDate) return;

    try {
      setCheckingAvailability(true);
      const result = await api.checkAvailability(
        productId,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      setAvailabilityResult(result);
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailabilityResult({
        available: false,
        message: 'Error al verificar disponibilidad. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setCheckingAvailability(false);
    }
  };

  // Verificar disponibilidad cuando cambien las fechas
  useEffect(() => {
    if (startDate && endDate) {
      checkAvailability();
    } else {
      setAvailabilityResult(null);
    }
  }, [startDate, endDate]);

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const isDateDisabled = (date) => {
    // Deshabilitar fechas pasadas y fechas ocupadas
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isDateBooked(date);
  };

  const getDayClassName = (date) => {
    if (isDateBooked(date)) {
      return 'booked-date';
    }
    return 'available-date';
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleReservationRequest = () => {
    if (onReservationRequest && startDate && endDate && availabilityResult?.available) {
      onReservationRequest({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days: calculateDays()
      });
    }
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setAvailabilityResult(null);
  };

  const retryLoadDates = () => {
    loadBookedDates();
  };

  if (loading) {
    return (
      <div className="availability-calendar">
        <div className="calendar-header">
          <h3>Disponibilidad</h3>
          <p>Selecciona las fechas de tu reserva</p>
        </div>
        <div className="calendar-loading">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando disponibilidad...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="availability-calendar">
        <div className="calendar-header">
          <h3>Disponibilidad</h3>
          <p>Selecciona las fechas de tu reserva</p>
        </div>
        <div className="calendar-error">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h4>Error al cargar disponibilidad</h4>
          <p>{error}</p>
          <button onClick={retryLoadDates} className="retry-btn">
            <i className="fas fa-redo"></i>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="availability-calendar">
      <div className="calendar-header">
        <h3>Disponibilidad</h3>
        <p>Selecciona las fechas de tu reserva</p>
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Disponible</span>
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>
          <span>Ocupado</span>
        </div>
      </div>

      <div className="calendar-container">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          monthsShown={2}
          locale="es"
          filterDate={(date) => !isDateDisabled(date)}
          dayClassName={getDayClassName}
          calendarClassName="custom-availability-calendar"
          minDate={new Date()}
        />
      </div>

      {startDate && endDate && (
        <div className="selection-summary">
          <div className="selected-dates">
            <div className="date-info">
              <strong>Recogida:</strong> {startDate.toLocaleDateString('es-ES')}
            </div>
            <div className="date-info">
              <strong>Entrega:</strong> {endDate.toLocaleDateString('es-ES')}
            </div>
            <div className="days-info">
              <strong>{calculateDays()} día{calculateDays() !== 1 ? 's' : ''}</strong>
            </div>
          </div>

          {checkingAvailability ? (
            <div className="checking-availability">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Verificando disponibilidad...</span>
            </div>
          ) : availabilityResult ? (
            <div className={`availability-result ${availabilityResult.available ? 'available' : 'unavailable'}`}>
              <div className="result-icon">
                <i className={`fas ${availabilityResult.available ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
              </div>
              <div className="result-message">
                {availabilityResult.available ? (
                  <span className="available-message">¡Fechas disponibles!</span>
                ) : (
                  <span className="unavailable-message">
                    {availabilityResult.message || 'Fechas no disponibles'}
                  </span>
                )}
              </div>
            </div>
          ) : null}

          <div className="calendar-actions">
            <button onClick={clearDates} className="clear-dates-btn">
              <i className="fas fa-times"></i>
              Limpiar fechas
            </button>
            {availabilityResult?.available && (
              <button onClick={handleReservationRequest} className="reserve-btn">
                <i className="fas fa-calendar-check"></i>
                Reservar ahora
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar; 