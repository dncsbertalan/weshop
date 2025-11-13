import { useMutation } from "@tanstack/react-query";

import { registerUser } from "../api/registerUser";

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}
