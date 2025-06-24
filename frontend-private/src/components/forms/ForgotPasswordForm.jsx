import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { usePasswordRecovery } from '../../hooks/usePasswordRecovery';
import { validateEmail } from '../../utils/validation';
import InputText from '../common/InputText';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';

const ForgotPasswordForm = () => {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const { 
    saveRecoveryAttempt, 
    canRequestRecovery, 
    getTimeUntilNextAttempt,
    getRemainingAttempts 
  } = usePasswordRecovery();
  
  const [submitMessage, setSubmitMessage] = useState({
    text: '',
    type: '', // 'success' | 'error' | 'info'
    email: ''
  });

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(
    { email: '' },
    (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'El email es requerido';
      } else if (!validateEmail(values.email)) {
        errors.email = 'Ingresa un email válido';
      }
      return errors;
    },
    async (formData) => {
      const email = formData.email.toLowerCase().trim();
      
      clearError();
      setSubmitMessage({ text: '', type: '', email: '' });

      // Verificar límite de intentos
      if (!canRequestRecovery(email)) {
        const timeLeft = getTimeUntilNextAttempt(email);
        const minutesLeft = Math.ceil(timeLeft / (1000 * 60));
        
        setSubmitMessage({
          text: `Has alcanzado el límite de intentos. Inténtalo de nuevo en ${minutesLeft} minutos.`,
          type: 'error',
          email: email
        });
        return;
      }

      // Intentar enviar email de recuperación
      const result = await forgotPassword(email);
      
      if (result.success) {
        // Guardar intento exitoso
        saveRecoveryAttempt(email);
        
        setSubmitMessage({
          text: 'Se ha enviado un enlace de recuperación a tu email. Revisa tu bandeja de entrada y spam.',
          type: 'success',
          email: email
        });
        
        // Limpiar formulario
        // resetForm(); // Opcional: mantener email para referencia
      } else {
        // Mostrar error específico
        let errorMessage = result.message || 'Error al enviar el email de recuperación';
        
        // Personalizar mensaje según el código de estado
        if (result.statusCode === 404) {
          errorMessage = 'No encontramos una cuenta con este email';
        } else if (result.statusCode === 429) {
          errorMessage = 'Demasiados intentos. Inténtalo más tarde';
        }
        
        setSubmitMessage({
          text: errorMessage,
          type: 'error',
          email: email
        });
      }
    }
  );

  const remainingAttempts = getRemainingAttempts(values.email);
  const showRemainingAttempts = values.email && remainingAttempts < 3 && remainingAttempts > 0;

  return (
    <div className="forgot-password-form">
      <div className="form-header text-center mb-6">
        <h2>¿Olvidaste tu contraseña?</h2>
        <p className="text-gray-600">
          No te preocupes, ingresa tu email y te enviaremos un enlace para recuperarla
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputText
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
        />

        {/* Mostrar intentos restantes */}
        {showRemainingAttempts && (
          <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
            Te quedan {remainingAttempts} intentos en esta hora
          </div>
        )}

        {/* Mensajes de estado */}
        {submitMessage.text && (
          <div className="message-container">
            {submitMessage.type === 'success' && (
              <SuccessMessage message={submitMessage.text} />
            )}
            {submitMessage.type === 'error' && (
              <ErrorMessage message={submitMessage.text} />
            )}
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        <Button 
          type="submit" 
          disabled={isSubmitting || isLoading || (values.email && !canRequestRecovery(values.email))}
          loading={isSubmitting || isLoading}
          className="w-full"
        >
          {isSubmitting || isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </Button>

        {/* Enlaces adicionales */}
        <div className="text-center space-y-2">
          <div>
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Volver al inicio de sesión
            </Link>
          </div>
          <div>
            <span className="text-gray-500">¿No tienes cuenta? </span>
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </form>

      {/* Información adicional después de envío exitoso */}
      {submitMessage.type === 'success' && (
        <div className="mt-6 text-sm text-gray-600 bg-blue-50 p-4 rounded">
          <h4 className="font-semibold mb-2">¿No encuentras el email?</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Revisa tu carpeta de spam o correo no deseado</li>
            <li>Verifica que escribiste correctamente tu email</li>
            <li>El enlace expira en 1 hora por seguridad</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;