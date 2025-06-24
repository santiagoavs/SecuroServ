import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputText from '../common/InputText';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import { authService } from '../../services/authService';
import { validateEmail } from '../../utils/validation';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError('');
    setSuccess('');
    
    // Validar email en tiempo real
    if (value && !validateEmail(value)) {
      setEmailError('Por favor ingresa un correo electrónico válido');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!email) {
      setError('El correo electrónico es requerido');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.forgotPassword(email);
      setSuccess('Te hemos enviado un enlace de recuperación a tu correo electrónico');
      
      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/auth/check-email', { state: { email } });
      }, 3000);
      
    } catch (err) {
      console.error('Error al enviar correo de recuperación:', err);
      setError(
        err.response?.data?.message || 
        'Hubo un error al enviar el correo de recuperación. Por favor intenta nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="forgot-password-form">
      <div className="form-header">
        <h2 className="form-title">¿Olvidaste tu contraseña?</h2>
        <p className="form-subtitle">
          Usa tu correo para recuperarla
        </p>
      </div>

      <form onSubmit={handleSubmit} className="forgot-form">
        <div className="input-group">
          <label htmlFor="email" className="input-label">
            Correo Electrónico
          </label>
          <InputText
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="correo@ejemplo.com"
            error={emailError}
            disabled={isLoading}
            autoComplete="email"
            autoFocus
          />
        </div>

        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !email || emailError}
            className="submit-button"
          >
            {isLoading ? <LoadingSpinner size="small" /> : 'Siguiente'}
          </Button>
          
          <button
            type="button"
            onClick={handleBackToLogin}
            className="back-button"
            disabled={isLoading}
          >
            Volver al inicio de sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;