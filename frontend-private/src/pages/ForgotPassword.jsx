import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <div className="forgot-password-page">
        {/* Sección izquierda - Imagen del auto */}
        <div className="forgot-password-image-section">
          <div className="brand-logo">
            <img 
              src="/images/brand/logo-seguro-white.png" 
              alt="Seguro Ser" 
              className="logo"
            />
          </div>
          
          <div className="car-showcase">
            <CarImage
              src="/images/cars/hero/red-sports-car.jpg"
              alt="Auto deportivo rojo"
              className="hero-car-image"
              loading="eager"
            />
          </div>
          
          <div className="image-overlay">
            <div className="gradient-overlay"></div>
            <div className="texture-overlay"></div>
          </div>
        </div>

        {/* Sección derecha - Formulario */}
        <div className="forgot-password-form-section">
          <div className="form-container">
            <div className="form-wrapper">
              <ForgotPasswordForm />
            </div>
            
            <div className="form-footer">
              <p className="footer-text">
                ¿Recordaste tu contraseña?{' '}
                <Link to="/auth/login" className="footer-link">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;