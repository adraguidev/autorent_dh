import React from 'react';
import './MainLayout.css';

const MainLayout = ({ 
  children, 
  title, 
  subtitle, 
  icon, 
  showStats = false, 
  stats = [], 
  headerActions = null,
  className = '',
  containerSize = 'large' // 'small', 'medium', 'large', 'full'
}) => {
  const containerClass = `layout-container ${containerSize}`;
  
  return (
    <div className={`main-layout ${className}`}>
      <div className={containerClass}>
        {/* Header de página */}
        {title && (
          <div className="page-header">
            <div className="header-content">
              <div className="header-main">
                <h1>
                  {icon && <i className={icon}></i>}
                  {title}
                </h1>
                {subtitle && <p className="header-subtitle">{subtitle}</p>}
              </div>
              {headerActions && (
                <div className="header-actions">
                  {headerActions}
                </div>
              )}
            </div>
            
            {/* Estadísticas opcionales */}
            {showStats && stats.length > 0 && (
              <div className="header-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Contenido principal */}
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 