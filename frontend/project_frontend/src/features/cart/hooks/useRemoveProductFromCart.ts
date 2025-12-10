import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProductFromCart } from "../api/removeProductFromCart";
import { CartKeys } from "../CartKeys";

export function useRemoveProductFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, cartItemId }: { cartId: number; cartItemId: number }) =>
      removeProductFromCart(cartId, cartItemId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
    },
  });
}
