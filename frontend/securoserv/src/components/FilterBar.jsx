import { FaCar, FaFilter, FaStar, FaTruck, FaCarSide } from 'react-icons/fa'

const FilterBar = ({ activeFilter, setActiveFilter, priceFilter, setPriceFilter }) => {
  const categories = ['Destacados', 'Coupés', 'SUV\'s', 'Pick-Ups']
  
  const getIcon = (category) => {
    switch(category) {
      case 'Destacados': return <FaStar className="me-2" />
      case 'Coupés': return <FaCar className="me-2" />
      case 'SUV\'s': return <FaCarSide className="me-2" />
      case 'Pick-Ups': return <FaTruck className="me-2" />
      default: return <FaCar className="me-2" />
    }
  }
  
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex flex-wrap gap-2 mb-3 mb-md-0">
            {categories.map(category => (
              <button
                key={category}
                className={`btn ${activeFilter === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveFilter(category)}>
                {getIcon(category)}{category}
              </button>
            ))}
          </div>
          
          <div className="w-md-25">
            <select 
              className="form-select"
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">Filtrar por precio</option>
              <option value="low">Menor precio</option>
              <option value="high">Mayor precio</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar