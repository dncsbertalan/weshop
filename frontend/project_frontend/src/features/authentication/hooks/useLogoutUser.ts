import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { authToken } from "@/api/api-constants";
import { Navigation } from "@/routes/navigation";

import { authToast } from "../utils/authToastOptions";
import { useAuthentication } from "./useAuthentication";

export function useLogoutUser() {
  const { setJwtToken } = useAuthentication();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    authToast.logoutSuccess();
    localStorage.removeItem(authToken);
    setJwtToken(null);
    queryClient.clear();
    void navigate(Navigation.home);
  };

  return { logout };
}
