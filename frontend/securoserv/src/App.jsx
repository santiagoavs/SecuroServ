import { useState } from 'react'
import { FaCar, FaStar, FaTruck, FaCarSide, FaFilter } from 'react-icons/fa'
import './App.css'

function App() {
  const [activeFilter, setActiveFilter] = useState('Destacados')
  const [showPriceFilter, setShowPriceFilter] = useState(false)

  const [vehicles] = useState ([
    { id: 1, name: 'Nissan Skyline R34', price: '$135,500', category: 'Destacados', image: 'nissan-skyline.png' },
    { id: 2, name: 'Toyota Supra MKA', price: '$35,500', category: 'Destacados', image: 'Toyota-supra.png' },
    { id: 3, name: 'Honda NSX 1990', price: '$270,000', category: 'Destacados', image: 'honda-nsx.png' }
  ]);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Destacados': return <FaStar className="category-icon" />
      case 'Coupés': return <FaCar className="category-icon" />
      case 'SUV\'s': return <FaCarSide className="category-icon" />
      case 'Pick-Ups': return <FaTruck className="category-icon" />
      default: return <FaCar className="category-icon" />
    }
  }

  return (
    <div className="secure-serv-container">
      <header className="app-header">
        <h1>SecuroServ</h1>
      </header>

      <div className="category-filters">
        {['Destacados', 'Coupés', 'SUV\'s', 'Pick-Ups'].map((category) => (
          <button
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {getCategoryIcon(category)}
            <span>{category}</span>
          </button>
        ))}
      </div>

      <div className="price-filter-container">
        <button 
          className="price-filter-btn"
          onClick={() => setShowPriceFilter(!showPriceFilter)}
        >
          <FaFilter />
          <span>Filtrar por precio</span>
        </button>
        
        {showPriceFilter && (
          <div className="price-filter-dropdown">
            <select className="price-selector">
              <option>Menor a mayor precio</option>
              <option>Mayor a menor precio</option>
              <option>Rango personalizado</option>
            </select>
          </div>
        )}
      </div>

      <div className="vehicle-list">
        {vehicles
          .filter(vehicle => activeFilter === 'Destacados' ? 
            vehicle.category === 'Destacados' : 
            vehicle.category === activeFilter)
          .map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <div className="vehicle-icon">
                <img src={`/src/assets/${vehicle.image}`} alt={vehicle.name} className='vehicle-image'/>
              </div>
              <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p className="vehicle-price">{vehicle.price}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App