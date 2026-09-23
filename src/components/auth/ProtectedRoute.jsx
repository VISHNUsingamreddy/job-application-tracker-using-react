import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

export default function ProtectedRoute() {
  const {isAuthenticated, authLoading} = useAuth();
  const location = useLocation();

  if (authLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{from: location}} />;
  }

  return <Outlet />;
}
