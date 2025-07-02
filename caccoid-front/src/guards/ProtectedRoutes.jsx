import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ element, allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    // Não autenticado: redireciona para login
    return <Navigate to="/email-auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Autenticado, mas sem permissão: redireciona para home
    return <Navigate to="/home" replace />;
  }

  // Autenticado e autorizado
  return element;
}