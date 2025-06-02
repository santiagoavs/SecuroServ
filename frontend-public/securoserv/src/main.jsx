import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/perfil" element={<div>Página de perfil (ejemplo)</div>} />
        <Route path="/info" element={<div>Página de información (ejemplo)</div>} />
        <Route path="/autos" element={<div>Página de autos (ejemplo)</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
