import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// Importar páginas existentes
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import CarDetailsPage from '../pages/CarDetails';

// Importar nueva página
import ResetPassword from '../pages/ResetPassword';

// Importar componentes de layout
import ProtectedRoute from '../components/layout/ProtectedRoute';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/car-details/:id" element={<CarDetailsPage />} />
          
          {/* Ruta raíz redirige a login */}
          <Route path="/" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Otras rutas protegidas existentes */}
          <Route path="/car-gallery" element={
            <ProtectedRoute>
              <CarGallery />
            </ProtectedRoute>
          } />
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;