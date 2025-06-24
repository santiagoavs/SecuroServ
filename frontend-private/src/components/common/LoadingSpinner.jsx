import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const spinnerClasses = `
    loading-spinner
    loading-spinner-${size}
    ${className}
  `.trim();

  return (
    <div className={spinnerClasses}>
      <div className="spinner-circle"></div>
    </div>
  );
};

export default LoadingSpinner;