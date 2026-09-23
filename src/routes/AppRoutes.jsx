import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/layout/Layout';
import {useAuth} from '../hooks/useAuth';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';

function HomeRedirect() {
  const {isAuthenticated, authLoading} = useAuth();
  if (authLoading) return null;
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
}

function PublicOnlyRoute() {
  const {isAuthenticated, authLoading} = useAuth();
  if (authLoading) return <Outlet />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}
