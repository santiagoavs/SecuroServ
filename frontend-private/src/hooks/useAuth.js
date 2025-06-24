import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { authService } from '../services/authService';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Limpiar errores
  const clearError = () => setError(null);

  // Método para forgot password
  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.forgotPassword(email);
      return { 
        success: true, 
        message: response.message || 'Se ha enviado un enlace de recuperación a tu email',
        data: response.data
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Error al enviar el email de recuperación';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage,
        statusCode: error.response?.status
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Método para reset password
  const resetPassword = async (token, newPassword) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.resetPassword(token, newPassword);
      return { 
        success: true, 
        message: response.message || 'Contraseña actualizada exitosamente',
        data: response.data
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Error al actualizar la contraseña';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage,
        statusCode: error.response?.status
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Método para validar token de reset
  const validateResetToken = async (token) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.validateResetToken(token);
      return { 
        valid: true, 
        email: response.email,
        expiresAt: response.expiresAt,
        data: response.data
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Token inválido o expirado';
      setError(errorMessage);
      return { 
        valid: false, 
        message: errorMessage,
        statusCode: error.response?.status
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...context, // Métodos existentes del contexto (login, register, etc.)
    forgotPassword,
    resetPassword,
    validateResetToken,
    isLoading,
    error,
    clearError
  };
};