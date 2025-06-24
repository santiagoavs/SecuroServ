import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const CheckEmailForm = ({ 
  email, 
  onResendEmail, 
  onBackToLogin, 
  onBackToForgot,
  loading,
  resendLoading,
  resendSuccess,
  resendError
}) => {
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!canResend || resendLoading) return;
    
    setCanResend(false);
    setCountdown(60); // 1 minuto de espera
    
    try {
      await onResendEmail(email);
    } catch (error) {
      console.error('Error al reenviar email:', error);
      setCanResend(true);
      setCountdown(0);
    }
  };

  const maskEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 
      ? username.substring(0, 2) + '*'.repeat(username.length - 2)
      : username;
    return `${maskedUsername}@${domain}`;
  };

  if (loading) {
    return (
      <div className="check-email-loading">
        <LoadingSpinner size="large" />
        <p>Procesando solicitud...</p>
      </div>
    );
  }

  return (
    <div className="check-email-form">
      <div className="form-header">
        <div className="email-icon">📧</div>
        <h2 className="form-title">Revisa tu correo</h2>
        <p className="form-subtitle">
          Te hemos enviado un enlace de recuperación a
        </p>
        <div className="email-display">
          <strong>{maskEmail(email)}</strong>
        </div>
      </div>

      <div className="instructions">
        <div className="instruction-item">
          <div className="step-number">1</div>
          <p>Revisa tu bandeja de entrada y la carpeta de spam</p>
        </div>
        <div className="instruction-item">
          <div className="step-number">2</div>
          <p>Haz clic en el enlace "Recuperar contraseña"</p>
        </div>
        <div className="instruction-item">
          <div className="step-number">3</div>
          <p>Crea tu nueva contraseña de forma segura</p>
        </div>
      </div>

      {resendSuccess && (
        <div className="success-message">
          ✅ Correo reenviado exitosamente
        </div>
      )}

      {resendError && (
        <div className="error-message">
          ❌ {resendError}
        </div>
      )}

      <div className="form-actions">
        <Button
          variant="secondary"
          onClick={handleResend}
          disabled={!canResend || resendLoading}
          loading={resendLoading}
          fullWidth
        >
          {resendLoading 
            ? 'Reenviando...' 
            : countdown > 0 
              ? `Reenviar en ${countdown}s` 
              : 'Reenviar correo'
          }
        </Button>
      </div>

      <div className="form-footer">
        <button
          type="button"
          className="link-button"
          onClick={onBackToForgot}
        >
          ← Usar otro correo
        </button>
        <button
          type="button"
          className="link-button"
          onClick={onBackToLogin}
        >
          Volver al inicio de sesión
        </button>
      </div>

      <div className="help-section">
        <h4>¿No recibiste el correo?</h4>
        <ul className="help-list">
          <li>Verifica que el correo sea correcto</li>
          <li>Revisa tu carpeta de spam o correo no deseado</li>
          <li>El enlace expira en 24 horas</li>
          <li>Asegúrate de tener conexión a internet</li>
        </ul>
      </div>

      <div className="security-note">
        <div className="security-icon">🔒</div>
        <p>
          Por tu seguridad, este enlace solo será válido por 24 horas
        </p>
      </div>
    </div>
  );
};

export default CheckEmailForm;