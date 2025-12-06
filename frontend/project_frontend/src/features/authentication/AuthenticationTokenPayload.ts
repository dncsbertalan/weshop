import { Role } from "./Role";

export interface AuthenticationTokenPayload {
  exp: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": Role[];
}
