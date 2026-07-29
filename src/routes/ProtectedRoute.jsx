import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, role, authLoading } = useSelector((state) => state.auth);
  if (authLoading) return null;
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/dashboard" />;
  return children;
}
