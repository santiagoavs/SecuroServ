import AdminHeader from '../components/admin/AdminHeader';
import AddVehicleModal from '../components/admin/AddVehicleModal';
import React, { useState } from 'react';
import '../styles/Dashboard.css'

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrEditVehicle = (vehicle) => {
    if (editingIndex !== null) {
      setVehicles(prev => prev.map((v, i) => i === editingIndex ? vehicle : v));
      setEditingIndex(null);
    } else {
      setVehicles(prev => [...prev, vehicle]);
    }
    setModalOpen(false);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("¿Seguro que querés eliminar este vehículo?");
    if (confirmDelete) {
      setVehicles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-overlay">
        <AdminHeader />

        <div className="admin-content">
  <div className="admin-panel-container">
    <div className="dashboard-header">
      <h2 className="dashboard-title">Panel de administración</h2>
      <button onClick={() => {
        setEditingIndex(null);
        setModalOpen(true);
      }} className="add-button">
        Agregar vehículo
      </button>
    </div>

    <AddVehicleModal
      isOpen={isModalOpen}
      onClose={() => {
        setModalOpen(false);
        setEditingIndex(null);
      }}
      onAdd={handleAddOrEditVehicle}
      initialData={editingIndex !== null ? vehicles[editingIndex] : null}
    />

    <div className="vehicle-list">
      {vehicles.map((v, i) => (
        <div key={i} className="vehicle-card-horizontal">
          <div className="vehicle-image-placeholder">IMG</div>
          <div className="vehicle-info">
            <h3 className="vehicle-model">{v.modelo}</h3>
            <p className="vehicle-brand">Marca: {v.marca}</p>
            <p className="vehicle-price">Precio: ${v.precio}</p>
          </div>
          <div className="vehicle-actions-horizontal">
            <button onClick={() => handleEdit(i)} className="edit-btn">Editar</button>
            <button onClick={() => handleDelete(i)} className="delete-btn">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


      </div>
    </div>
  );
};


export default Dashboard;
