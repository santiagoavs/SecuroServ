import VehicleCard from './VehicleCard.jsx'

const VehicleList = ({ vehicles, activeFilter, priceFilter }) => {
  // Filtrar vehículos por categoría
  let filteredVehicles = vehicles.filter(vehicle => 
    activeFilter === 'Destacados' 
      ? vehicle.category === 'Destacados'
      : vehicle.category === activeFilter
  )

  // Ordenar por precio si se seleccionó un filtro de precio
  if (priceFilter === 'low') {
    filteredVehicles.sort((a, b) => a.price - b.price)
  } else if (priceFilter === 'high') {
    filteredVehicles.sort((a, b) => b.price - a.price)
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {filteredVehicles.length > 0 ? (
        filteredVehicles.map(vehicle => (
          <div key={vehicle.id} className="col">
            <VehicleCard vehicle={vehicle} />
          </div>
        ))
      ) : (
        <div className="col-12">
          <div className="alert alert-info">No hay vehículos disponibles en esta categoría.</div>
        </div>
      )}
    </div>
  )
}

export default VehicleList