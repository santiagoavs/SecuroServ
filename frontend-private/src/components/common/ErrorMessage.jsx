import React from 'react';

const ErrorMessage = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`error-message ${className}`}>
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
    </div>
  );
};

export default ErrorMessage;