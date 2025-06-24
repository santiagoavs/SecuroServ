import { apiRequest, setAuthToken, clearAuth } from './httpClient';

// Servicio de autenticación
export const authService = {
  // Iniciar sesión
  login: async (credentials) => {
    try {
      const response = await apiRequest.post('/auth/login', credentials);
      
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await apiRequest.post('/auth/register', userData);
      
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  // Solicitar recuperación de contraseña
  forgotPassword: async (email) => {
    try {
      const response = await apiRequest.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      console.error('Error en forgot password:', error);
      throw error;
    }
  },

  // Restablecer contraseña
  resetPassword: async (token, newPassword, confirmPassword) => {
    try {
      const response = await apiRequest.post('/auth/reset-password', {
        token,
        password: newPassword,
        passwordConfirmation: confirmPassword
      });
      
      return response;
    } catch (error) {
      console.error('Error en reset password:', error);
      throw error;
    }
  },

  // Verificar token de restablecimiento
  verifyResetToken: async (token) => {
    try {
      const response = await apiRequest.post('/auth/verify-reset-token', { token });
      return response;
    } catch (error) {
      console.error('Error al verificar token:', error);
      throw error;
    }
  },

  // Cambiar contraseña (usuario autenticado)
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await apiRequest.post('/auth/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      });
      
      return response;
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      throw error;
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await apiRequest.post('/auth/logout');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar token independientemente del resultado
      clearAuth();
    }
  },

  // Obtener usuario actual
  getCurrentUser: async () => {
    try {
      const response = await apiRequest.get('/auth/me');
      return response;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      throw error;
    }
  },

  // Actualizar perfil de usuario
  updateProfile: async (profileData) => {
    try {
      const response = await apiRequest.put('/auth/profile', profileData);
      return response;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  },

  // Verificar email
  verifyEmail: async (token) => {
    try {
      const response = await apiRequest.post('/auth/verify-email', { token });
      return response;
    } catch (error) {
      console.error('Error al verificar email:', error);
      throw error;
    }
  },

  // Reenviar verificación de email
  resendEmailVerification: async (email) => {
    try {
      const response = await apiRequest.post('/auth/resend-verification', { email });
      return response;
    } catch (error) {
      console.error('Error al reenviar verificación:', error);
      throw error;
    }
  },

  // Refrescar token
  refreshToken: async () => {
    try {
      const response = await apiRequest.post('/auth/refresh');
      
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      clearAuth();
      throw error;
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Obtener token almacenado
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Validar sesión
  validateSession: async () => {
    try {
      if (!authService.isAuthenticated()) {
        return false;
      }

      const response = await apiRequest.get('/auth/validate');
      return response.valid || false;
    } catch (error) {
      console.error('Error al validar sesión:', error);
      clearAuth();
      return false;
    }
  },

  // Obtener información básica del usuario desde el token
  getUserFromToken: () => {
    try {
      const token = authService.getToken();
      if (!token) return null;

      // Decodificar JWT básico (solo para obtener info, no para validar)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub || payload.userId,
        email: payload.email,
        name: payload.name || payload.username,
        role: payload.role,
        exp: payload.exp
      };
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  },

  // Verificar si el token está expirado
  isTokenExpired: () => {
    try {
      const user = authService.getUserFromToken();
      if (!user || !user.exp) return true;

      const currentTime = Date.now() / 1000;
      return user.exp < currentTime;
    } catch (error) {
      return true;
    }
  },

  // Configurar auto-logout cuando el token expire
  setupAutoLogout: (onLogout) => {
    const checkTokenExpiration = () => {
      if (authService.isAuthenticated() && authService.isTokenExpired()) {
        console.warn('Token expirado, cerrando sesión automáticamente');
        authService.logout();
        if (onLogout) onLogout();
      }
    };

    // Verificar cada minuto
    const interval = setInterval(checkTokenExpiration, 60000);
    
    // Verificar inmediatamente
    checkTokenExpiration();

    // Retornar función para limpiar el intervalo
    return () => clearInterval(interval);
  }
};

// Exportar como default también
export default authService;