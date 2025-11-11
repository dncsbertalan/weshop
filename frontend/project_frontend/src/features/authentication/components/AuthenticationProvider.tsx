import { useGetCurrentUser } from "@/features/users/hooks/useGetCurrentUser";
import { PropsWithChildren, useState, useEffect, useMemo } from "react";
import { AuthenticationKeys } from "../AuthenticationKeys";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { Role } from "@/features/authentication/Role";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";

interface JwtPayload {
  exp: number;
  email?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: Role[];
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [jwtToken, setJwtToken] = useState<string | null>(() =>
    localStorage.getItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey)
  );

  const { data: user } = useGetCurrentUser({ enabled: isAuthenticated });

  const isAdmin = useMemo(() => roles.includes(Role.Admin), [roles]);

  // decode the JWT token returned on login, extracting the roles and expiration date from it
  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(jwtToken);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey);
          setJwtToken(null);
          setIsAuthenticated(false);
          setRoles([]);
          queryClient.clear();
          return;
        }

        const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? [];

        setIsAuthenticated(true);
        setRoles(roles);
      } catch (err) {
        console.error("Failed to decode token:", err);
        setRoles([]);
      }
    } else {
      setRoles([]);
    }
  }, [jwtToken, queryClient]);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        roles,
        isAuthenticated,
        isAdmin,
        jwtToken,
        setJwtToken,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
