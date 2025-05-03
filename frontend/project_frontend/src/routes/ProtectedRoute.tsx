import { useAuth } from "@/context/AuthContext";
import { Navigation } from "@/routes/navigation";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={Navigation.login} replace />;
};

export default ProtectedRoute;