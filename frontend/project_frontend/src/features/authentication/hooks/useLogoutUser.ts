import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { authToken } from "@/api/api-constants";
import { Navigation } from "@/routes/navigation";

import { useAuthentication } from "./useAuthentication";

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
