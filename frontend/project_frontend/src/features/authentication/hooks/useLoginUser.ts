import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

import { Navigation } from "@/routes/navigation";

import { loginUser } from "../api/loginUser";
import { AuthenticationKeys } from "../AuthenticationKeys";
import { authToast } from "../utils/authToastOptions";
import { useAuthentication } from "./useAuthentication";

export function useLoginUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setJwtToken } = useAuthentication();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token }) => {
      authToast.loginSuccess();

      localStorage.setItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey, token);
      setJwtToken(token);
      queryClient.clear();

      void navigate(Navigation.home);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (!status) {
          authToast.unexpectedError();
          return;
        }

        if (status >= 500) {
          authToast.serverError();
          return;
        }

        authToast.loginError();
      }
    },
  });
}
