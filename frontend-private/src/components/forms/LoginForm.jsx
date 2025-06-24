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
    <div className="login-form">
      <div className="form-header">
        <h1>Bienvenido</h1>
        <p>Ingresa tus datos para iniciar sesión</p>
      </div>

      <form onSubmit={handleSubmit}>
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
          <a href="#register" className="link-register">Regístrate ahora</a>
        </div>

        <div className="form-links">
          <a href="#forgot-password" className="link-forgot">¿Olvidaste tu contraseña?</a>
        </div>

        <div className="form-submit">
          <Button type="submit" variant="primary">
            Ingresar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;