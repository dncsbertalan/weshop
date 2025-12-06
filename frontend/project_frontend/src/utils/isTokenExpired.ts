import { jwtDecode } from "jwt-decode";

import { AuthenticationTokenPayload } from "@/features/authentication/AuthenticationTokenPayload";

export function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode<AuthenticationTokenPayload>(token);
    if (!decoded.exp) {
      return true;
    }

    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
