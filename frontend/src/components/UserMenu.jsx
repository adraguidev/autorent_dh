import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!user) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <div className="user-info" onClick={toggleMenu}>
        <div className="user-avatar">
          {(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}
        </div>
        <span className="user-name">{user.firstName} {user.lastName}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'dropdown-arrow--open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="currentColor"
        >
          <path d="M3 5l3 3 3-3z"/>
        </svg>
      </div>
      
      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-menu-avatar">
              {(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}
            </div>
            <div className="user-menu-info">
              <div className="user-menu-name">{user.firstName} {user.lastName}</div>
              <div className="user-menu-email">{user.email}</div>
            </div>
          </div>
          <hr className="user-menu-divider" />
          <button className="user-menu-item" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 13h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1H4V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1z"/>
              <path d="M2 8a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6A.5.5 0 0 0 2 8z"/>
              <path d="M6.354 4.646a.5.5 0 0 0-.708.708L7.293 7H2.5a.5.5 0 0 0 0 1h4.793l-1.647 1.646a.5.5 0 0 0 .708.708l2.5-2.5a.5.5 0 0 0 0-.708l-2.5-2.5z"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 