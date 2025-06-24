import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <AuthLayout title="Recuperar Contraseña">
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;