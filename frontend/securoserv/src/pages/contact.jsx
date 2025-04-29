import React, { useState } from 'react';
 
export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    motivo: 'Otro',
    mensaje: ''
  });
 
  const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
    // Aquí podrías enviar el formulario a un backend
  };
 
  return (
    <div className="bg-red-900 text-white p-6 max-w-md rounded-lg shadow-lg m-auto">
      <div className="text-right">
        <button className="text-white text-2xl font-bold">&times;</button>
      </div>
      <h2 className="text-xl font-bold mb-2">¿Tienes dudas, consultas o problemas?</h2>
      <h3 className="text-3xl font-extrabold mb-4">Contáctanos</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 rounded bg-red-800 text-white placeholder-white"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo Electrónico"
          value={form.correo}
          onChange={handleChange}
          className="w-full p-2 rounded bg-red-800 text-white placeholder-white"
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Número de teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full p-2 rounded bg-red-800 text-white placeholder-white"
          required
        />
        <select
          name="motivo"
          value={form.motivo}
          onChange={handleChange}
          className="w-full p-2 rounded bg-red-800 text-white"
        >
          <option>Otro</option>
          <option>Consulta</option>
          <option>Problema</option>
        </select>
        <textarea
          name="mensaje"
          placeholder="Mensaje"
          value={form.mensaje}
          onChange={handleChange}
          className="w-full p-2 rounded bg-red-800 text-white placeholder-white"
          rows="4"
        />
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
