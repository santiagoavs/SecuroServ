import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout'
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import CheckEmailForm from '../components/forms/CheckEmailForm';
import { authService } from '../services/authService';


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('forgot'); // 'forgot' | 'check-email'
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');

  // Manejar envío de solicitud de recuperación
  const handleForgotPassword = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authService.forgotPassword(formData.email);
      
      if (response.success) {
        setEmail(formData.email);
        setCurrentStep('check-email');
        setSuccess('Correo de recuperación enviado exitosamente');
        
        // Mostrar toast de éxito
        Toast.show({
          type: 'success',
          message: 'Revisa tu correo electrónico',
          duration: 5000
        });
      } else {
        setError(response.message || 'Error al enviar el correo de recuperación');
      }
    } catch (err) {
      console.error('Error en forgot password:', err);
      
      // Manejar diferentes tipos de errores
      if (err.response) {
        switch (err.response.status) {
          case 404:
            setError('No encontramos una cuenta con este correo electrónico');
            break;
          case 429:
            setError('Demasiados intentos. Espera unos minutos antes de intentar nuevamente');
            break;
          case 500:
            setError('Error del servidor. Inténtalo más tarde');
            break;
          default:
            setError(err.response.data?.message || 'Error al procesar la solicitud');
        }
      } else if (err.request) {
        setError('Error de conexión. Verifica tu internet e inténtalo nuevamente');
      } else {
        setError('Error inesperado. Inténtalo más tarde');
      }
    } finally {
      setLoading(false);
    }
  };

  // Manejar reenvío de correo
  const handleResendEmail = async (emailToResend) => {
    setResendLoading(true);
    setResendError('');
    setResendSuccess('');

    try {
      const response = await authService.forgotPassword(emailToResend);
      
      if (response.success) {
        setResendSuccess('Correo reenviado exitosamente');
        
        Toast.show({
          type: 'success',
          message: 'Correo reenviado',
          duration: 3000
        });
      } else {
        setResendError(response.message || 'Error al reenviar el correo');
      }
    } catch (err) {
      console.error('Error al reenviar correo:', err);
      setResendError('Error al reenviar el correo. Inténtalo más tarde');
    } finally {
      setResendLoading(false);
    }
  };

  // Navegación
  const handleBackToLogin = () => {
    navigate('/login', { replace: true });
  };

  const handleBackToForgot = () => {
    setCurrentStep('forgot');
    setEmail('');
    setError('');
    setSuccess('');
    setResendError('');
    setResendSuccess('');
  };

  // Limpiar mensajes después de un tiempo
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  React.useEffect(() => {
    if (resendSuccess) {
      const timer = setTimeout(() => setResendSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [resendSuccess]);

  // Configurar el título de la página
  React.useEffect(() => {
    document.title = currentStep === 'forgot' 
      ? 'SEGURO - Recuperar Contraseña' 
      : 'SEGURO - Revisa tu Correo';
  }, [currentStep]);

  return (
    <AuthLayout 
      showBackButton={true}
      onBack={handleBackToLogin}
      backgroundImage="/images/cars/backgrounds/auth-bg-red-car.jpg"
    >
      <div className="forgot-password-page">
        {currentStep === 'forgot' && (
          <ForgotPasswordForm
            onSubmit={handleForgotPassword}
            onBackToLogin={handleBackToLogin}
            loading={loading}
            error={error}
            success={success}
          />
        )}
        
        {currentStep === 'check-email' && (
          <CheckEmailForm
            email={email}
            onResendEmail={handleResendEmail}
            onBackToLogin={handleBackToLogin}
            onBackToForgot={handleBackToForgot}
            loading={loading}
            resendLoading={resendLoading}
            resendSuccess={resendSuccess}
            resendError={resendError}
          />
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;