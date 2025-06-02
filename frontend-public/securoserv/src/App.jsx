import { useState } from 'react'
import { FaCar, FaStar, FaTruck, FaCarSide, FaFilter } from 'react-icons/fa'
import './styles/App.css'
import Header from './components/Header'
import VehicleCard from './components/VehicleCard'

const categories = ['Destacados', 'Coupés', 'SUV', 'Pick-Up'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Destacados');

  const vehicles = [
    { name: 'Nissan Skyline R34', price: '135,500', category: 'Destacados', image: '/assets/nissan-skyline.png' },
    { name: 'Toyota Supra MKA', price: '35,500', category: 'Destacados', image: '/assets/Toyota-supra.png' },
    { name: 'Honda NSX 1990', price: '270,000', category: 'Destacados', image: '/assets/honda-nsx.png' }
  ];

  const filteredVehicles = selectedCategory === 'Destacados'
    ? vehicles
    : vehicles.filter(v => v.category === selectedCategory);

  return (
    <>
    <Header/>
    {<div className="secure-serv-container">
      <div className="app-container">
      <div className="filter-bar">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`filter-category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="vehicle-grid">
        {filteredVehicles.map((v, idx) => (
          <VehicleCard key={idx} {...v} />
        ))}
      </div>
   </div>
   </div>}
    </>
  );
}

export default App