import { createContext } from "react";

import { UserDto } from "@/dtos/response/user/UserDto";
import { Role } from "@/features/authentication/Role";

interface AuthenticationContextType {
  user: UserDto | undefined;
  roles: Role[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  jwtToken: string | null;
  setJwtToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);
