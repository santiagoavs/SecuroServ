import '../styles/VehicleCard.css';

function VehicleCard({ name, price, image }) {
  return (
    <div className="vehicle-card">
      <img src={image} alt={name} className="vehicle-image" />
      <div className="vehicle-details">
        <h2 className="vehicle-name">{name}</h2>
        <span className="vehicle-price">${price}</span>
      </div>
    </div>
  );
}

export default VehicleCard;
