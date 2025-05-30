// ================================================================
// UTILIDADES DE FECHAS - FUNCIÓN ÚNICA PARA TODA LA APLICACIÓN
// ================================================================

/**
 * Formatea una fecha como string local sin zona horaria
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha en formato YYYY-MM-DD
 */
export const formatDateLocal = (date) => {
  if (!date) return '';
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parsea una fecha string a Date object local
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {Date} - Date object local
 */
export const parseDateLocal = (dateString) => {
  if (!dateString) return null;
  
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month es 0-indexed
};

/**
 * FUNCIÓN ÚNICA PARA CALCULAR DÍAS ENTRE FECHAS
 * Esta es la función autoritaria que debe usarse en toda la aplicación
 * @param {Date|string} startDate - Fecha de inicio
 * @param {Date|string} endDate - Fecha de fin
 * @returns {number} - Número de días (incluyendo inicio y fin)
 */
export const calculateDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  
  let start, end;
  
  // Normalizar a Date objects si son strings
  if (typeof startDate === 'string') {
    start = parseDateLocal(startDate);
  } else {
    start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  }
  
  if (typeof endDate === 'string') {
    end = parseDateLocal(endDate);
  } else {
    end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  }
  
  // Calcular diferencia en días + 1 para incluir ambos días
  const diffTime = end.getTime() - start.getTime();
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  console.log('📅 calculateDaysBetween:', {
    startInput: startDate,
    endInput: endDate,
    startNormalized: start.toDateString(),
    endNormalized: end.toDateString(),
    diffTime,
    days
  });
  
  return Math.max(days, 1); // Mínimo 1 día
};

/**
 * Valida si una fecha es válida
 * @param {Date} date - Fecha a validar
 * @returns {boolean} - True si es válida
 */
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

/**
 * Genera un array de fechas entre dos fechas (inclusivo)
 * @param {Date|string} startDate - Fecha de inicio
 * @param {Date|string} endDate - Fecha de fin
 * @returns {Date[]} - Array de fechas
 */
export const generateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return [];
  
  let start = typeof startDate === 'string' ? parseDateLocal(startDate) : startDate;
  let end = typeof endDate === 'string' ? parseDateLocal(endDate) : endDate;
  
  const dates = [];
  const current = new Date(start);
  
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}; 