import { authToken } from "@/api/api-constants";
import { authLogin, authRegister } from "@/api/auth-api";
import { LoginDto } from "@/dtos/LoginDto";
import { RegistrationDto } from "@/dtos/RegistrationDto";
import { Navigation } from "@/routes/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";

// TODO: Move this to a separate file
// eslint-disable-next-line react-refresh/only-export-components
export enum Role {
  User = "User",
  Admin = "Admin",
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  loginIsPending: boolean;
  loginIsError: boolean;
  registerIsPending: boolean;
  roles: Role[];
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegistrationDto) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(authToken)
  );
  const [roles, setRoles] = useState<Role[]>([Role.User]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isPending: isLoggingIn,
    isError: loginIsError,
    mutateAsync: loginMutate,
  } = useMutation({
    mutationFn: authLogin,
    onSuccess: ({ token, roles }) => {
      localStorage.setItem(authToken, token);
      setToken(token);
      setIsAuthenticated(true);
      setRoles(roles);
      queryClient.clear();
      navigate(Navigation.home);
    },
  });

  const { isPending: isRegistering, mutateAsync: registerMutate } = useMutation(
    {
      mutationFn: authRegister,
      onSuccess: (token) => {
        localStorage.setItem(authToken, token);
        setToken(token);
        setIsAuthenticated(true);
        queryClient.clear();
        navigate(Navigation.home);
      },
    }
  );

  const login = async (credentials: LoginDto) => {
    await loginMutate(credentials);
  };

  const register = async (data: RegistrationDto) => {
    await registerMutate(data);
  };

  const logout = async () => {
    localStorage.removeItem(authToken);
    setToken(null);
    setIsAuthenticated(false);
    queryClient.clear();
    navigate(Navigation.home);
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
    <AuthContext.Provider
      value={{
        roles,
        isAuthenticated,
        token,
        loginIsPending: isLoggingIn,
        loginIsError,
        registerIsPending: isRegistering,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
