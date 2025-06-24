// src/hooks/useForm.js
import { useState, useEffect } from 'react';

export const useForm = (initialValues = {}, validateForm = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcular si el formulario es válido
  const isValid = Object.keys(errors).length === 0 && 
                 Object.keys(touched).length > 0 &&
                 Object.values(values).some(value => value !== '');

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Marcar como tocado
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Manejar blur (cuando se sale del input)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validar formulario si hay función de validación
    if (validateForm) {
      const validationErrors = validateForm(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    // Ejecutar función de envío
    setIsSubmitting(true);
    onSubmit(values);
  };

  // Validar en tiempo real cuando cambian los valores
  useEffect(() => {
    if (validateForm && Object.keys(touched).length > 0) {
      const validationErrors = validateForm(values);
      setErrors(validationErrors);
    }
  }, [values, touched, validateForm]);

  // Resetear formulario
  const resetForm = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // Establecer valores específicos
  const setFieldValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Establecer error específico
  const setFieldError = (name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Limpiar errores
  const clearErrors = () => {
    setErrors({});
  };

  // Limpiar error específico
  const clearFieldError = (name) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    clearErrors,
    clearFieldError,
    setIsSubmitting
  };
};