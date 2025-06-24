// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Función para obtener valor inicial
  const getInitialValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage para la clave "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getInitialValue);

  // Función para establecer valor
  const setValue = (value) => {
    try {
      // Permitir que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar en estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error al guardar en localStorage para la clave "${key}":`, error);
    }
  };

  // Función para remover valor
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error al remover localStorage para la clave "${key}":`, error);
    }
  };

  // Escuchar cambios en localStorage desde otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error al parsear valor de localStorage para la clave "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

// Hook específico para datos de recuperación de contraseña
export const usePasswordRecovery = () => {
  const [recoveryData, setRecoveryData, removeRecoveryData] = useLocalStorage('password_recovery', {
    email: '',
    timestamp: null,
    attempts: 0
  });

  const saveRecoveryAttempt = (email) => {
    setRecoveryData({
      email,
      timestamp: Date.now(),
      attempts: (recoveryData.attempts || 0) + 1
    });
  };

  const canRequestRecovery = () => {
    if (!recoveryData.timestamp) return true;
    
    const timeDiff = Date.now() - recoveryData.timestamp;
    const minutesSinceLastAttempt = timeDiff / (1000 * 60);
    
    // Permitir nueva solicitud después de 5 minutos
    return minutesSinceLastAttempt >= 5;
  };

  const getRemainingTime = () => {
    if (!recoveryData.timestamp) return 0;
    
    const timeDiff = Date.now() - recoveryData.timestamp;
    const minutesSinceLastAttempt = timeDiff / (1000 * 60);
    
    return Math.max(0, 5 - minutesSinceLastAttempt);
  };

  const clearRecoveryData = () => {
    removeRecoveryData();
  };

  return {
    recoveryData,
    saveRecoveryAttempt,
    canRequestRecovery,
    getRemainingTime,
    clearRecoveryData
  };
};

// Hook para recordar datos de formulario temporalmente
export const useFormPersistence = (formKey, initialValues = {}) => {
  const [formData, setFormData, removeFormData] = useLocalStorage(
    `form_${formKey}`, 
    initialValues
  );

  const saveFormData = (data) => {
    setFormData({
      ...data,
      timestamp: Date.now()
    });
  };

  const getFormData = () => {
    if (!formData.timestamp) return initialValues;
    
    // Limpiar datos después de 1 hora
    const timeDiff = Date.now() - formData.timestamp;
    if (timeDiff > 3600000) {
      removeFormData();
      return initialValues;
    }
    
    return formData;
  };

  const clearFormData = () => {
    removeFormData();
  };

  return {
    formData: getFormData(),
    saveFormData,
    clearFormData
  };
};