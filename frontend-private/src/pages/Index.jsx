import React, { useState } from 'react';
import { User, FileText, Filter, Plus, Minus } from 'lucide-react';

const SecuroCarWebsite = () => {
  const [activeCategory, setActiveCategory] = useState('Destacados');
  const [priceFilter, setPriceFilter] = useState('');
  const [filterExpanded, setFilterExpanded] = useState(false);

  const cars = [
    {
      id: 1,
      brand: 'BMW',
      model: '2015 BMW 4 Series',
      price: '$17,000',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop&crop=center',
      category: 'Destacados'
    },
    {
      id: 2,
      brand: 'DODGE',
      model: 'Dodge Challenger 2017',
      price: '$28,000',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop&crop=center',
      category: 'Coupés'
    },
    {
      id: 3,
      brand: 'HONDA',
      model: 'Honda s2000',
      price: '$15,995',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop&crop=center',
      category: 'Coupés'
    },
    {
      id: 4,
      brand: 'FORD',
      model: 'Ford Mustang 2018',
      price: '$24,500',
      image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=250&fit=crop&crop=center',
      category: 'Coupés'
    },
    {
      id: 5,
      brand: 'AUDI',
      model: 'Audi TT 2016',
      price: '$32,000',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop&crop=center',
      category: 'Coupés'
    },
    {
      id: 6,
      brand: 'TOYOTA',
      model: 'Toyota 86 2019',
      price: '$26,995',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop&crop=center',
      category: 'Coupés'
    }
  ];

  const categories = ['Destacados', 'Coupés', "SUV's", 'Pick-Ups'];

  const filteredCars = cars.filter(car => {
    const categoryMatch = activeCategory === 'Destacados' || car.category === activeCategory;
    
    if (!priceFilter) return categoryMatch;
    
    const price = parseInt(car.price.replace(/[$,]/g, ''));
    
    switch(priceFilter) {
      case '0-20000':
        return categoryMatch && price <= 20000;
      case '20000-30000':
        return categoryMatch && price > 20000 && price <= 30000;
      case '30000+':
        return categoryMatch && price > 30000;
      default:
        return categoryMatch;
    }
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect width="1200" height="600" fill="%23334155"/><path d="M0 300 Q300 200 600 300 T1200 300 V600 H0 Z" fill="%23475569"/></svg>')`
        }}
      >
        {/* Navigation Icons */}
        <div className="absolute top-8 left-8 flex space-x-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Price Filter */}
        <div className="absolute top-8 right-8">
          <button 
            onClick={() => setFilterExpanded(!filterExpanded)}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 text-white font-semibold flex items-center space-x-2 transition-colors duration-200"
          >
            <Filter className="w-5 h-5" />
            <span>Filtrar por precio</span>
            {filterExpanded ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
          
          {/* Filter Dropdown */}
          {filterExpanded && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rango de precio
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="">Todos los precios</option>
                    <option value="0-20000">$0 - $20,000</option>
                    <option value="20000-30000">$20,000 - $30,000</option>
                    <option value="30000+">$30,000+</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      setPriceFilter('');
                      setFilterExpanded(false);
                    }}
                    className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Limpiar
                  </button>
                  <button 
                    onClick={() => setFilterExpanded(false)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logo and Title */}
        <div className="absolute top-1/2 left-16 transform -translate-y-1/2">
          <div className="text-white">
            <h1 className="text-6xl font-bold tracking-wider mb-2">
              SECURO
            </h1>
            <p className="text-3xl font-light italic text-red-400">
              Serv
            </p>
          </div>
        </div>

        {/* Red Sports Car */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center"
              alt="Red Sports Car"
              className="absolute bottom-0 right-0 w-full h-full object-cover object-center filter drop-shadow-2xl"
              style={{ 
                maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-black py-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-1 py-6 px-8 text-lg font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-red-600 text-white'
                    : index === 0
                    ? 'bg-red-700 text-white hover:bg-red-600'
                    : 'bg-gray-300 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Brand Logo */}
                <div className="bg-gray-100 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-700">
                    {car.brand}
                  </div>
                </div>
                
                {/* Car Image */}
                <div className="bg-gray-200 h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.model}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Car Details */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {car.model}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">
                      {car.price}
                    </span>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="text-3xl font-bold mb-2">SECURO <span className="text-red-400 italic">Serv</span></div>
          <p className="text-gray-400">Tu concesionario de confianza</p>
        </div>
      </footer>
    </div>
  );
};

export default SecuroCarWebsite;