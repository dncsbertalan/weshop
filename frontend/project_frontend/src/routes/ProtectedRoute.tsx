import { Role } from "@/features/authentication/Role";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { Navigation } from "@/routes/navigation";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRoles: Role[];
  redirectPath?: string;
}

const ProtectedRoute = ({ allowedRoles, redirectPath = Navigation.login }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthentication();

  if (isAuthenticated && user?.roles.some((role) => allowedRoles.includes(role as Role))) {
    return <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
