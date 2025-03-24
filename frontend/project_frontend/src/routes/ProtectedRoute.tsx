import { useAuth } from "@/context/authContext";
import { Navigation } from "@/models/Navigation";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={Navigation.login} replace />;
};

export default ProtectedRoute;