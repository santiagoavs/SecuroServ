import React, { useState } from 'react';
import './AddVehicleModal.css';

const AddVehicleModal = ({ isOpen, onClose, onAdd, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
  modelo: '',
  marca: '',
  precio: ''
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Agregar vehículo</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="modelo" placeholder="Modelo" value={formData.modelo} onChange={handleChange} required />
          <input type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={handleChange} required />
          <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
          <div className="modal-buttons">
            <button type="submit">Agregar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
