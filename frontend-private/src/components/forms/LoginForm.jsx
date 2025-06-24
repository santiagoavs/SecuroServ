// src/components/forms/LoginForm.jsx
import React, { useState } from 'react';
import InputText from '../common/InputText';
import Button from '../common/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Aquí iría la lógica de login
  };

  return (
    <div className="login-form-container"> {/* Cambié aquí de login-form a login-form-container */}
      <div className="form-header">
        <h1 className="form-title">Bienvenido</h1> {/* Agregué clase form-title */}
        <p className="form-subtitle">Ingresa tus datos para iniciar sesión</p> {/* Agregué clase form-subtitle */}
      </div>

      <form onSubmit={handleSubmit} className="login-form"> {/* Agregué clase aquí */}
        <div className="form-group">
          <InputText
            label="Correo Electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div className="form-group">
          <InputText
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div className="form-links">
          <span>¿No tienes una cuenta? </span>
          <a href="register" className="register-link">Regístrate ahora</a> {/* Cambié clase */}
        </div>

        <div className="form-links">
          <a href="forgot-password" className="forgot-password-link">¿Olvidaste tu contraseña?</a> {/* Cambié clase */}
        </div>

        <div className="form-actions"> {/* Cambié de form-submit a form-actions */}
          <Button type="submit" variant="primary" className="btn btn-primary btn-full-width">
            Ingresar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;