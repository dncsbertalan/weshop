import { normalizeArray } from "@/utils/normalizeArray";
import { jwtDecode } from "jwt-decode";
import { AuthenticationKeys } from "../AuthenticationKeys";
import { JwtPayload } from "../components/AuthenticationProvider";

export function getInitialRoles() {
  const jwtToken = localStorage.getItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey);

  if (!jwtToken) {
    return [];
  }

  try {
    const decoded = jwtDecode<JwtPayload>(jwtToken);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey);
      return [];
    }

    return normalizeArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
  } catch (_) {
    return [];
  }
}
