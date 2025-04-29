import { FaCar } from 'react-icons/fa'

function VehicleCard({ vehicle }) {
    return (
      <div className="vehicle-card">
        <div className="vehicle-image-container">
          <img 
            src={vehicle.image} 
            alt={vehicle.name}
            className="vehicle-image"
            loading="lazy"
          />
        </div>
        <div className="vehicle-info">
          <h3>{vehicle.name}</h3>
          <p className="vehicle-price">{vehicle.price}</p>
        </div>
      </div>
    )
  }
export default VehicleCard