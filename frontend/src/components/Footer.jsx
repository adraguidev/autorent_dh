// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-info-block">
          <span className="footer-logo-placeholder">AUTORENT</span>
          <span className="footer-text">&copy; {currentYear} AutoRent. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
