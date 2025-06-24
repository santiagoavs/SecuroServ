import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { validatePassword } from '../../utils/validation';
import InputText from '../common/InputText';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import LoadingSpinner from '../common/LoadingSpinner';

const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, validateResetToken, isLoading, error, clearError } = useAuth();
  
  const [tokenValidation, setTokenValidation] = useState({
    isValid: null,
    isChecking: true,
    userEmail: '',
    error: null
  });
  
  const [submitMessage, setSubmitMessage] = useState({
    text: '',
    type: '' // 'success' | 'error'
  });

  // Validar token al montar el componente
  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setTokenValidation({
          isValid: false,
          isChecking: false,
          userEmail: '',
          error: 'Token no proporcionado'
        });
        return;
      }

      const result = await validateResetToken(token);
      
      setTokenValidation({
        isValid: result.valid,
        isChecking: false,
        userEmail: result.email || '',
        error: result.valid ? null : result.message
      });
    };
    
    checkToken();
  }, [token, validateResetToken]);

  // Configuración del formulario
  const { values, errors, handleChange, handleSubmit, isSubmitting, resetForm } = useForm(
    { password: '', confirmPassword: '' },
    (values) => {
      const errors = {};
      
      if (!values.password) {
        errors.password = 'La contraseña es requerida';
      } else if (!validatePassword(values.password)) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números';
      }
      
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }
      
      return errors;
    },
    async (formData) => {
      clearError();
      setSubmitMessage({ text: '', type: '' });
      
      const result = await resetPassword(token, formData.password);
      
      if (result.success) {
        setSubmitMessage({
          text: 'Contraseña actualizada exitosamente. Redirigiendo...',
          type: 'success'
        });
        
        resetForm();
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.' 
            }
          });
        }, 3000);
      } else {
        setSubmitMessage({
          text: result.message || 'Error al actualizar la contraseña',
          type: 'error'
        });
      }
    }
  );

  // Mostrar spinner mientras valida el token
  if (tokenValidation.isChecking) {
    return (
      <div className="reset-password-form">
        <div className="text-center">
          <LoadingSpinner />
          <p>Validando enlace de recuperación...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si el token no es válido
  if (!tokenValidation.isValid) {
    return (
      <div className="reset-password-form">
        <div className="text-center">
          <h2>Enlace inválido</h2>
          <ErrorMessage message={tokenValidation.error || 'El enlace de recuperación no es válido o ha expirado'} />
          <div className="mt-4">
            <Link to="/ForgotPassword">
              <Button type="button">
                Solicitar nuevo enlace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Formulario principal
  return (
    <div className="reset-password-form">
      <div className="form-header text-center mb-6">
        <h2>Recupera tu contraseña</h2>
        <p className="text-gray-600">
          Ingresa tu nueva contraseña para <strong>{tokenValidation.userEmail}</strong>
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputText
          name="password"
          type="password"
          placeholder="Nueva contraseña"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          required
        />

        <InputText
          name="confirmPassword"
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          required
        />

        {/* Mensajes de estado */}
        {submitMessage.text && (
          submitMessage.type === 'success' 
            ? <SuccessMessage message={submitMessage.text} />
            : <ErrorMessage message={submitMessage.text} />
        )}

        {error && <ErrorMessage message={error} />}

        <Button 
          type="submit" 
          disabled={isSubmitting || isLoading}
          loading={isSubmitting || isLoading}
          className="w-full"
        >
          {isSubmitting || isLoading ? 'Actualizando contraseña...' : 'Actualizar contraseña'}
        </Button>

        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;