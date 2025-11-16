import { useMutation, useQueryClient } from "@tanstack/react-query";
import { switchActiveCart } from "../api/switchActiveCart";
import { UserKeys } from "@/features/users/UserKeys";
import { CartKeys } from "../CartKeys";

export function useSwitchActiveCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: switchActiveCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UserKeys.CurrentUser] });
      queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
    },
  });
}
