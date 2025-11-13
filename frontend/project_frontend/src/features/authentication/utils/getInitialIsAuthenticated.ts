import { jwtDecode } from "jwt-decode";
import { AuthenticationKeys } from "../AuthenticationKeys";
import { JwtPayload } from "../components/AuthenticationProvider";

export function getInitialIsAuthenticated() {
  const jwtToken = localStorage.getItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey);

  if (!jwtToken) {
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(jwtToken);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey);
      return false;
    }

    return true;
  } catch (_) {
    return false;
  }
}
