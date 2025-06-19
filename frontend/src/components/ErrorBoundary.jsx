import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Registra el error
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            maxWidth: '600px'
          }}>
            <i className="fas fa-exclamation-triangle" style={{
              fontSize: '3rem',
              color: '#dc3545',
              marginBottom: '1rem'
            }}></i>
            <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>
              ¡Ops! Algo salió mal
            </h2>
            <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>
              Ha ocurrido un error inesperado. Por favor, recarga la página o intenta de nuevo.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details style={{ 
                textAlign: 'left', 
                backgroundColor: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '4px',
                marginBottom: '1rem'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Detalles del error (solo en desarrollo)
                </summary>
                <pre style={{ 
                  fontSize: '0.8rem', 
                  overflow: 'auto',
                  color: '#dc3545',
                  marginTop: '0.5rem'
                }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Recargar página
              </button>
              <button 
                onClick={() => window.history.back()}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Volver atrás
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 