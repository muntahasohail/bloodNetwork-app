import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Donors from "../pages/Donors";
import Donate from "../pages/Donate";
import Requests from "../pages/Requests";
import NotFound from "../pages/NotFound";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import MyRequests from "../pages/Myrequests";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
      <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
      <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
      <Route
        path="/user/dashboard"
        element={<ProtectedRoute requiredRole="user"><UserDashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>}
      />
      <Route path="/my-requests" element={<ProtectedRoute><MyRequests /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;