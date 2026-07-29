import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { role } = useSelector((s) => s.auth);
  if (role === 'admin') return <Navigate to="/admin/dashboard" />;
  return <Navigate to="/user/dashboard" />;
}