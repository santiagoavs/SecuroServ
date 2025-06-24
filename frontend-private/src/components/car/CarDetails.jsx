import React from 'react';
import './styles/CarDetails.css'

const CarDetails = ({ car, onUpdatePurchase, onDeletePurchase }) => {
  if (!car) {
    return <div className="car-details-loading">Cargando detalles del auto...</div>;
  }

  return (
    <div className="car-details-container">
      {/* Header con logo */}
      <div className="car-details-header">
        <div className="logo-container">
          <h1 className="logo-text">SECURO</h1>
          <span className="logo-subtitle">Serv</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="car-details-content">
        <div className="car-info-section">
          {/* Título y precio */}
          <div className="car-title-section">
            <div className="car-brand-logo">
              <img src="/images/brand/nissan_1.png" alt="Nissan" className="brand-logo" />
            </div>
            <h2 className="car-title">{car.name || 'Nissan Skyline R34'}</h2>
            <div className="car-price">${car.price || '124,909'}</div>
          </div>

          {/* Descripción */}
          <div className="car-description">
            <p>
              {car.description || `El Nissan Skyline GT-R R34 es un automóvil deportivo icónico producido por Nissan entre 1999 y 2002. Es parte de la legendaria línea Skyline GT-R, conocida por su rendimiento y tecnología avanzada. El R34 es especialmente famoso por su motor RB26DETT, un motor biturbo de 2,6 litros en línea de seis cilindros, que ofrece una potencia impresionante y una gran capacidad de modificación.`}
            </p>
            <p>
              {car.additionalInfo || `El R34 también se destaca por su sistema de tracción integral ATTESA E-TS y su sistema de suspensión HICAS, que mejoran su manejo y estabilidad. Además, su diseño agresivo y su presencia en la cultura popular, especialmente en películas y videojuegos como "Fast & Furious" y la serie "Gran Turismo", lo han convertido en un coche de culto entre los entusiastas del automovilismo. Es considerado uno de los GT-R más emblemáticos y deseados de la historia.`}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="car-actions">
            <button 
              className="btn btn-primary"
              onClick={() => onUpdatePurchase && onUpdatePurchase(car)}
            >
              Actualizar
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onDeletePurchase && onDeletePurchase(car)}
            >
              Eliminar
              <span className="btn-price">${car.reservePrice || '33,000'}</span>
            </button>
          </div>
        </div>

        {/* Galería de imágenes */}
        <div className="car-gallery-section">
          <div className="main-image">
            <img 
              src={car.mainImage || '/images/cars/gallery/Syline-Atras.png'} 
              alt={car.name || 'Nissan Skyline R34'}
              className="car-main-image"
            />
          </div>
          <div className="thumbnail-gallery">
            {/* Primera imagen - tamaño grande horizontal */}
            <img 
              src={car.image2 || '/images/cars/gallery/Syline-Lateral.png'} 
              alt="Vista lateral"
              className="car-thumbnail-active-large-thumb"
            />
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;