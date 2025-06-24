import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const usePasswordRecovery = () => {
  const [recoveryAttempts, setRecoveryAttempts] = useLocalStorage('passwordRecoveryAttempts', []);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const saveRecoveryAttempt = (email) => {
    const now = new Date();
    const newAttempt = {
      email: email.toLowerCase(),
      timestamp: now.toISOString(),
      id: Date.now() // ID único para el intento
    };
    
    setRecoveryAttempts(prev => {
      // Mantener solo los últimos 10 intentos para no llenar el localStorage
      const updated = [...prev, newAttempt];
      return updated.slice(-10);
    });
  };

  const canRequestRecovery = (email) => {
    if (!email) return false;
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 hora atrás
    const emailLower = email.toLowerCase();
    
    // Filtrar intentos recientes para este email
    const recentAttempts = recoveryAttempts.filter(attempt => 
      attempt.email === emailLower && 
      new Date(attempt.timestamp) > oneHourAgo
    );
    
    return recentAttempts.length < 3; // Máximo 3 intentos por hora
  };

  const getTimeUntilNextAttempt = (email) => {
    if (!email || canRequestRecovery(email)) return 0;
    
    const now = new Date();
    const emailLower = email.toLowerCase();
    const emailAttempts = recoveryAttempts
      .filter(attempt => attempt.email === emailLower)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (emailAttempts.length === 0) return 0;
    
    const lastAttempt = emailAttempts[0];
    const nextAttemptTime = new Date(new Date(lastAttempt.timestamp).getTime() + 60 * 60 * 1000);
    
    return Math.max(0, nextAttemptTime.getTime() - now.getTime());
  };

  const getRemainingAttempts = (email) => {
    if (!email) return 3;
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const emailLower = email.toLowerCase();
    
    const recentAttempts = recoveryAttempts.filter(attempt => 
      attempt.email === emailLower && 
      new Date(attempt.timestamp) > oneHourAgo
    );
    
    return Math.max(0, 3 - recentAttempts.length);
  };

  const clearRecoveryAttempts = () => {
    setRecoveryAttempts([]);
  };

  return {
    saveRecoveryAttempt,
    canRequestRecovery,
    getTimeUntilNextAttempt,
    getRemainingAttempts,
    clearRecoveryAttempts,
    isRateLimited
  };
};