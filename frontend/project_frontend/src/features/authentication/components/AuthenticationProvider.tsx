import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { Role } from "@/features/authentication/Role";
import { useGetCurrentUser } from "@/features/users/hooks/useGetCurrentUser";

import { AuthenticationKeys } from "../AuthenticationKeys";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { normalizeArray } from "@/utils/normalizeArray";
import { getInitialIsAuthenticated } from "../utils/getInitialIsAuthenticated";
import { getInitialRoles } from "../utils/getInitialRoles";

export interface JwtPayload {
  exp: number;
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": Role[];
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getInitialIsAuthenticated);
  const [roles, setRoles] = useState<Role[]>(getInitialRoles);
  const [jwtToken, setJwtToken] = useState<string | null>(() =>
    localStorage.getItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey),
  );

  const { data: user } = useGetCurrentUser({ enabled: isAuthenticated });

  const isAdmin = useMemo(() => roles.includes(Role.Admin), [roles]);

  // decode the JWT token returned on login, extracting the roles and expiration date from it
  useEffect(() => {
    if (!jwtToken) {
      console.log("az isten bassza meg");
      setIsAuthenticated(false);
      setRoles([]);
      return;
    }

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

      const roles = normalizeArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

      setIsAuthenticated(true);
      setRoles(roles);
    } catch (err) {
      console.error("Failed to decode token:", err);
      setIsAuthenticated(false);
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
