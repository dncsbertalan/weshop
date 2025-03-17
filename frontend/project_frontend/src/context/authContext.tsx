import { authToken } from "@/api/apiConstants";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(authToken));
    const isAuthenticated = !!token;

    const login = (newToken: string) => {
        localStorage.setItem(authToken, newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem(authToken);
        setToken(null);
    };


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