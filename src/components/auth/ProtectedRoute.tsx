import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({ requireAdmin }: { requireAdmin?: boolean }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    // Return an empty or loading state while auth initializes
    return <div className="min-h-screen bg-background flex items-center justify-center" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
