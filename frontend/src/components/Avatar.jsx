import React from 'react';
import './Avatar.css';

const Avatar = ({ initials, size = 'medium', onClick }) => {
  return (
    <div 
      className={`avatar avatar--${size}`} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {initials}
    </div>
  );
};

export default Avatar; 