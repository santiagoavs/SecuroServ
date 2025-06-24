import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Función para hacer peticiones API
export const apiRequest = async (method, url, data = null) => {
  try {
    const config = {
      method,
      url,
      ...(data && { data }),
    };
    
    const response = await httpClient(config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Función para establecer token de autenticación
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    delete httpClient.defaults.headers.common['Authorization'];
  }
};

// Función para limpiar autenticación
export const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  delete httpClient.defaults.headers.common['Authorization'];
};

export default httpClient;