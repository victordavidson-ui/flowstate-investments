import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({ requireAdmin }: { requireAdmin?: boolean }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center" />;
  }

  // Admin bypass with master key
  const hasMasterKey = localStorage.getItem("admin_master_key") === "1507003";

  if (requireAdmin) {
    if (hasMasterKey) return <Outlet />;
    if (!isAuthenticated || !user?.isAdmin) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
