// src/pages/Login.jsx
import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import '../styles/login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="login-container">
      {/* Lado izquierdo - Imagen del auto */}
      <div className="login-left">
  <div className="logo-container">
    <div className="secuko-logo">
      <div className="secuko-main">SECURO</div>
      <div className="secuko-sub">Serv</div>
    </div>
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

export default Login;