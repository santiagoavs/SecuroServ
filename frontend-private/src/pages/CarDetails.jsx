import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarDetails from '../components/car/CarDetails';
import '../styles/CarDetails.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos de ejemplo - en una app real vendría del servicio
  const mockCarData = {
    id: id || '1',
    name: 'Nissan Skyline R34',
    price: '124,909',
    reservePrice: '33,000',
    brand: 'Nissan',
    mainImage: '/images/cars/gallery/Sline-principal.png',
    image2: '/images/cars/gallery/Syline-Lateral.png',
    description: `El Nissan Skyline GT-R R34 es un automóvil deportivo icónico producido por Nissan entre 1999 y 2002. Es parte de la legendaria línea Skyline GT-R, conocida por su rendimiento y tecnología avanzada. El R34 es especialmente famoso por su motor RB26DETT, un motor biturbo de 2,6 litros en línea de seis cilindros, que ofrece una potencia impresionante y una gran capacidad de modificación.`,
    additionalInfo: `El R34 también se destaca por su sistema de tracción integral ATTESA E-TS y su sistema de suspensión HICAS, que mejoran su manejo y estabilidad. Además, su diseño agresivo y su presencia en la cultura popular, especialmente en películas y videojuegos como "Fast & Furious" y la serie "Gran Turismo", lo han convertido en un coche de culto entre los entusiastas del automovilismo. Es considerado uno de los GT-R más emblemáticos y deseados de la historia.`
  };

  useEffect(() => {
    // Simular carga de datos
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        // Aquí irían las llamadas al servicio real
        // const carData = await carService.getCarById(id);
        
        // Simulamos un delay de carga
        setTimeout(() => {
          setCar(mockCarData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Error al cargar los detalles del auto');
        setLoading(false);
      }
    };

    loadCarDetails();
  }, [id]);

  const handleUpdatePurchase = (carData) => {
    // Lógica para actualizar compra
    console.log('Actualizando compra para:', carData);
    // Aquí iría la llamada al servicio
    // await purchaseService.updatePurchase(carData.id);
    
    // Mostrar notificación de éxito
    alert('Compra actualizada correctamente');
  };

  const handleDeletePurchase = (carData) => {
    // Lógica para eliminar compra
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta compra?');
    
    if (confirmDelete) {
      console.log('Eliminando compra para:', carData);
      // Aquí iría la llamada al servicio
      // await purchaseService.deletePurchase(carData.id);
      
      // Mostrar notificación y redirigir
      alert('Compra eliminada correctamente');
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="car-details-page loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando detalles del auto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-details-page error">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      <CarDetails 
        car={car}
        onUpdatePurchase={handleUpdatePurchase}
        onDeletePurchase={handleDeletePurchase}
      />
    </div>
  );
};

export default CarDetailsPage;