import React from 'react';
import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <img src='/assets/securo-logo.png' alt="SecuroServ Admin" className="admin-logo" />
        <img src='/assets/header-car.png' alt="Car Decor" className="admin-car" />
      </div>
    </header>
  );
};

export default AdminHeader;
