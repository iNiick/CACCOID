import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    toast.error('Acesso negado. Você não tem permissão para acessar esta página.');
  }

  return element;
};