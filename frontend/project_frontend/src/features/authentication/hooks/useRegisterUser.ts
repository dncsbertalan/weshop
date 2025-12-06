import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { Navigation } from "@/routes/navigation";

import { registerUser } from "../api/registerUser";
import { authToast } from "../utils/authToastOptions";

export function useRegisterUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      authToast.registrationSuccess();
      void navigate(Navigation.login, { replace: true });
    },
    onError: () => {
      authToast.registrationError();
    },
  });
}
