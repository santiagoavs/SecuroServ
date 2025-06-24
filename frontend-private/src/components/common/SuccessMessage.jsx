import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SuccessMessage = ({ 
  message, 
  duration = 0, 
  onClose, 
  className = '',
  showIcon = true,
  persistent = false 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (duration > 0 && !persistent) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, persistent]);

  useEffect(() => {
    // Animación de entrada
    setIsAnimating(true);
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(animationTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      // Dar tiempo para la animación de salida
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  if (!isVisible || !message) {
    return null;
  }

  return (
    <div 
      className={`success-message ${isAnimating ? 'animating' : ''} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="success-content">
        {showIcon && (
          <div className="success-icon">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                fill="currentColor"
              />
            </svg>
          </div>
        )}
        
        <div className="success-text">
          {message}
        </div>
        
        {!persistent && (
          <button 
            className="success-close"
            onClick={handleClose}
            aria-label="Cerrar mensaje"
            type="button"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 4L4 12M4 4l8 8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  className: PropTypes.string,
  showIcon: PropTypes.bool,
  persistent: PropTypes.bool
};

export default SuccessMessage;