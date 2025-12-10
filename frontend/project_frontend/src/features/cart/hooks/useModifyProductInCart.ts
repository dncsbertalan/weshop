import { useMutation, useQueryClient } from "@tanstack/react-query";

import { modifyProductInCart } from "../api/modifyProductInCart";
import { CartKeys } from "../CartKeys";

export function useModifyProductInCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, cartItemId, quantity }: { cartId: number; cartItemId: number; quantity: number }) =>
      modifyProductInCart(cartId, cartItemId, quantity),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
    },
  });
}
