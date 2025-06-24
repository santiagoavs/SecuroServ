// src/pages/Register.jsx
import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import '../styles/login.css';

const Register = () => {
  const [activeTab, setActiveTab] = useState('register');

  return (
    <div className="login-container">
      {/* Lado izquierdo - Imagen del auto */}
      <div className="login-left">
        <div className="logo-container">
          <img src="/images/brand/logo-seguro-white.png" alt="SEGURO" className="logo" />
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="login-right">
        {/* Navegación de tabs */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Inicio de sesión
          </button>
          <button 
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Registro
          </button>
        </div>

        {/* Contenido del formulario */}
        <div className="form-container">
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default Register;