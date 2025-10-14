import { useGetCurrentUser } from "@/features/users/hooks/useGetCurrentUser";
import { PropsWithChildren, useState, useEffect, useMemo } from "react";
import { AuthenticationKeys } from "../AuthenticationKeys";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { Role } from "@/context/authContext";

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string | null>(() =>
    localStorage.getItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey)
  );

  const { data: user } = useGetCurrentUser();

  const isAdmin = useMemo(() => user?.roles.find((role) => role === Role.Admin) !== undefined, [user?.roles]);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
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
