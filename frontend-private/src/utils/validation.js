// Utilidades de validación

// Validar email
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// Validar contraseña
export const validatePassword = (password) => {
  if (!password) return false;
  
  // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validar que las contraseñas coincidan
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Validar nombre (solo letras y espacios)
export const validateName = (name) => {
  if (!name) return false;
  
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
  return nameRegex.test(name.trim());
};

// Validar teléfono
export const validatePhone = (phone) => {
  if (!phone) return false;
  
  // Acepta diferentes formatos de teléfono
  const phoneRegex = /^[\+]?[1-9][\d]{0,19}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Validar longitud mínima
export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

// Validar longitud máxima
export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

// Validar campo requerido
export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

// Validar URL
export const validateUrl = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validar fecha
export const validateDate = (date) => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

// Validar edad mínima
export const validateMinAge = (birthDate, minAge = 18) => {
  if (!birthDate) return false;
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= minAge;
};

// Validar número
export const validateNumber = (value, min = null, max = null) => {
  const num = parseFloat(value);
  
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  
  return true;
};

// Validar entero
export const validateInteger = (value, min = null, max = null) => {
  const num = parseInt(value, 10);
  
  if (isNaN(num) || !Number.isInteger(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  
  return true;
};

// Validador de formulario completo
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    // Validar campo requerido
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = fieldRules.messages?.required || `${field} es requerido`;
      return;
    }
    
    // Si el campo está vacío y no es requerido, omitir otras validaciones
    if (!value && !fieldRules.required) {
      return;
    }
    
    // Validar email
    if (fieldRules.email && !validateEmail(value)) {
      errors[field] = fieldRules.messages?.email || 'Email inválido';
      return;
    }
    
    // Validar contraseña
    if (fieldRules.password && !validatePassword(value)) {
      errors[field] = fieldRules.messages?.password || 
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
      return;
    }
    
    // Validar confirmación de contraseña
    if (fieldRules.passwordMatch) {
      const passwordField = fieldRules.passwordMatch;
      if (!validatePasswordMatch(value, formData[passwordField])) {
        errors[field] = fieldRules.messages?.passwordMatch || 'Las contraseñas no coinciden';
        return;
      }
    }
    
    // Validar nombre
    if (fieldRules.name && !validateName(value)) {
      errors[field] = fieldRules.messages?.name || 'Nombre inválido';
      return;
    }
    
    // Validar teléfono
    if (fieldRules.phone && !validatePhone(value)) {
      errors[field] = fieldRules.messages?.phone || 'Teléfono inválido';
      return;
    }
    
    // Validar longitud mínima
    if (fieldRules.minLength && !validateMinLength(value, fieldRules.minLength)) {
      errors[field] = fieldRules.messages?.minLength || 
        `Debe tener al menos ${fieldRules.minLength} caracteres`;
      return;
    }
    
    // Validar longitud máxima
    if (fieldRules.maxLength && !validateMaxLength(value, fieldRules.maxLength)) {
      errors[field] = fieldRules.messages?.maxLength || 
        `No puede exceder ${fieldRules.maxLength} caracteres`;
      return;
    }
    
    // Validar URL
    if (fieldRules.url && !validateUrl(value)) {
      errors[field] = fieldRules.messages?.url || 'URL inválida';
      return;
    }
    
    // Validar fecha
    if (fieldRules.date && !validateDate(value)) {
      errors[field] = fieldRules.messages?.date || 'Fecha inválida';
      return;
    }
    
    // Validar edad mínima
    if (fieldRules.minAge && !validateMinAge(value, fieldRules.minAge)) {
      errors[field] = fieldRules.messages?.minAge || 
        `Debe ser mayor de ${fieldRules.minAge} años`;
      return;
    }
    
    // Validar número
    if (fieldRules.number && !validateNumber(value, fieldRules.min, fieldRules.max)) {
      errors[field] = fieldRules.messages?.number || 'Número inválido';
      return;
    }
    
    // Validar entero
    if (fieldRules.integer && !validateInteger(value, fieldRules.min, fieldRules.max)) {
      errors[field] = fieldRules.messages?.integer || 'Número entero inválido';
      return;
    }
    
    // Validación personalizada
    if (fieldRules.custom && typeof fieldRules.custom === 'function') {
      const customError = fieldRules.custom(value, formData);
      if (customError) {
        errors[field] = customError;
        return;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Mensajes de error predeterminados en español
export const defaultErrorMessages = {
  required: 'Este campo es requerido',
  email: 'Por favor ingresa un email válido',
  password: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
  passwordMatch: 'Las contraseñas no coinciden',
  name: 'Por favor ingresa un nombre válido',
  phone: 'Por favor ingresa un teléfono válido',
  url: 'Por favor ingresa una URL válida',
  date: 'Por favor ingresa una fecha válida',
  number: 'Por favor ingresa un número válido',
  integer: 'Por favor ingresa un número entero válido',
  minLength: (min) => `Debe tener al menos ${min} caracteres`,
  maxLength: (max) => `No puede exceder ${max} caracteres`,
  minAge: (age) => `Debe ser mayor de ${age} años`
};

// Función para sanitizar input
export const sanitizeInput = (value) => {
  if (typeof value !== 'string') return value;
  
  return value
    .trim()
    .replace(/[<>]/g, '') // Remover caracteres HTML básicos
    .replace(/javascript:/gi, '') // Remover posibles scripts
    .replace(/on\w+=/gi, ''); // Remover atributos de eventos
};

// Función para limpiar formulario
export const cleanFormData = (formData) => {
  const cleaned = {};
  
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    
    if (typeof value === 'string') {
      cleaned[key] = sanitizeInput(value);
    } else {
      cleaned[key] = value;
    }
  });
  
  return cleaned;
};