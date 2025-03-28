import { authToken } from "@/api/api-constants";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(authToken));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

    const login = async (newToken: string) => {
        localStorage.setItem(authToken, newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        localStorage.removeItem(authToken);
        setToken(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const syncAuth = () => {
            setToken(localStorage.getItem(authToken));
        };

        window.addEventListener("storage", syncAuth);
        return () => {
            window.removeEventListener("storage", syncAuth);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};