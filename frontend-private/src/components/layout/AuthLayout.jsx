import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const AuthLayout = ({ 
  children, 
  showBackButton = false, 
  onBack, 
  backgroundImage,
  title = "SEGURO",
  subtitle = "Sistema de Gestión Vehicular"
}) => {
  return (
    <div className="auth-layout min-h-screen flex">
      {/* Panel izquierdo - Imagen de fondo */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundColor: backgroundImage ? 'transparent' : '#dc2626'
          }}
        >
          {/* Overlay para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Contenido sobre la imagen */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl opacity-90">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="flex-1 lg:w-1/2 flex flex-col">
        {/* Header con botón de regreso */}
        {showBackButton && (
          <div className="flex items-center p-6 lg:p-8">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Volver</span>
            </button>
          </div>
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Logo móvil (solo visible en pantallas pequeñas) */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold text-red-600 mb-2">{title}</h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>

            {/* Contenido del formulario */}
            <div className="bg-white">
              {children}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 lg:p-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 SEGURO. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};