import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserKeys } from "@/features/users/UserKeys";

import { switchActiveCart } from "../api/switchActiveCart";
import { CartKeys } from "../CartKeys";

export function useSwitchActiveCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: switchActiveCart,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [UserKeys.CurrentUser] });
      void queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
    },
  });
}
