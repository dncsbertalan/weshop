import { useQueryClient } from "@tanstack/react-query";
import { useAuthentication } from "./useAuthentication";
import { authToken } from "@/api/api-constants";
import { useNavigate } from "react-router";
import { Navigation } from "@/routes/navigation";

export function useLogoutUser() {
  const { setJwtToken } = useAuthentication();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(authToken);
    setJwtToken(null);
    queryClient.clear();
    navigate(Navigation.home);
  };

  return { logout };
}
