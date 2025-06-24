import { httpClient } from './httpClient';

export const authService = {
  // ... métodos existentes (login, register, logout, etc.)

  // Password Recovery Methods
  forgotPassword: async (email) => {
    try {
      const response = await httpClient.post('/auth/forgot-password', { 
        email: email.toLowerCase().trim() 
      });
      return response.data;
    } catch (error) {
      console.error('AuthService - forgotPassword error:', error);
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await httpClient.post('/auth/reset-password', { 
        token: token.trim(),
        password: newPassword,
        // Opcional: confirmar password si el backend lo requiere
        confirmPassword: newPassword
      });
      return response.data;
    } catch (error) {
      console.error('AuthService - resetPassword error:', error);
      throw error;
    }
  },

  validateResetToken: async (token) => {
    try {
      const response = await httpClient.get(`/auth/reset-password/${token}/validate`);
      return response.data;
    } catch (error) {
      console.error('AuthService - validateResetToken error:', error);
      throw error;
    }
  },

  // Método adicional para verificar si un email existe (opcional)
  checkEmailExists: async (email) => {
    try {
      const response = await httpClient.post('/auth/check-email', { 
        email: email.toLowerCase().trim() 
      });
      return response.data;
    } catch (error) {
      console.error('AuthService - checkEmailExists error:', error);
      throw error;
    }
  }
};
