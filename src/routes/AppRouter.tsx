import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import BuildingsPage from '@/pages/BuildingsPage';
import PrivateRoute from './PrivateRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function AuthRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}

export default function AppRouter() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } 
      />
      <Route
        path="/edificios"
        element={
          <PrivateRoute>
            <BuildingsPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<AuthRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}