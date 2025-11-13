import { Navigate, Outlet } from "react-router";

import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { Role } from "@/features/authentication/Role";
import { Navigation } from "@/routes/navigation";

interface ProtectedRouteProps {
  allowedRoles: Role[];
  redirectPath?: string;
}

const ProtectedRoute = ({ allowedRoles, redirectPath = Navigation.login }: ProtectedRouteProps) => {
  const { isAuthenticated, roles } = useAuthentication();

  if (isAuthenticated && roles.some((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
