// src/components/forms/RegisterForm.jsx
import React, { useState } from 'react';
import InputText from '../common/InputText';
import Button from '../common/Button';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);
    // Aquí iría la lógica de registro
  };

  return (
    <div className="register-form">
      <div className="form-header">
        <h1>Crear Cuenta</h1>
        <p>Regístrate para acceder a todos los servicios</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <InputText
            label="Nombre Completo"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

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

        <div className="form-group">
          <InputText
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div className="form-links">
          <span>¿Ya tienes una cuenta? </span>
          <a href="#login" className="link-register">Iniciar sesión</a>
        </div>

        <div className="form-submit">
          <Button type="submit" variant="primary">
            Registrarse
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;