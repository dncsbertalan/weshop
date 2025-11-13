import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser } from "../api/loginUser";
import { AuthenticationKeys } from "../AuthenticationKeys";
import { useAuthentication } from "./useAuthentication";

export function useLoginUser() {
  const queryClient = useQueryClient();
  const { setJwtToken } = useAuthentication();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token }) => {
      localStorage.setItem(AuthenticationKeys.AuthenticatianTokenLocalStorageKey, token);
      setJwtToken(token);
      queryClient.clear();
    },
  });
}
