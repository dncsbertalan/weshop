import { Role, useAuth } from "@/context/AuthContext";
import { Navigation } from "@/routes/navigation";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRoles: Role[];
  redirectPath?: string;
}

const ProtectedRoute = ({
  allowedRoles,
  redirectPath = Navigation.login,
}: ProtectedRouteProps) => {
  const { isAuthenticated, roles } = useAuth();

  if (isAuthenticated && roles.some((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
