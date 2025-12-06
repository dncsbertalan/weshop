import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { Role } from "@/features/authentication/Role";
import { useGetCurrentUser } from "@/features/users/hooks/useGetCurrentUser";
import { isTokenExpired } from "@/utils/isTokenExpired";
import { normalizeArray } from "@/utils/normalizeArray";

import { AuthenticationKeys } from "../AuthenticationKeys";
import { AuthenticationTokenPayload } from "../AuthenticationTokenPayload";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [jwtToken, setJwtToken] = useState<string | null>(() =>
    localStorage.getItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey),
  );

  const decoded = useMemo(() => {
    if (!jwtToken) {
      return null;
    }

    try {
      return jwtDecode<AuthenticationTokenPayload>(jwtToken);
    } catch {
      return null;
    }
  }, [jwtToken]);

  const expired = useMemo(() => {
    if (!jwtToken) {
      return true;
    }

    return isTokenExpired(jwtToken);
  }, [jwtToken]);

  const roles = useMemo(() => {
    if (!decoded || expired) {
      return [];
    }

    return normalizeArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
  }, [decoded, expired]);

  const isAuthenticated = !!jwtToken && !expired;
  const isAdmin = useMemo(() => roles.includes(Role.Admin), [roles]);

  const { data: user } = useGetCurrentUser({ enabled: isAuthenticated });

  useEffect(() => {
    if (expired && jwtToken) {
      localStorage.removeItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey);
      setJwtToken(null);
      queryClient.clear();
    }
  }, [expired, jwtToken, queryClient]);

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
