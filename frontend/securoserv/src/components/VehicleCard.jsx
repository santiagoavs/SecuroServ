import { FaCar } from 'react-icons/fa'

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        <div className="mb-3">
          <FaCar size={48} className="text-primary" />
        </div>
        <h5 className="card-title">{vehicle.name}</h5>
        <p className="card-text text-muted">{vehicle.plate}</p>
        <p className="fw-bold text-success">${vehicle.price.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default VehicleCard