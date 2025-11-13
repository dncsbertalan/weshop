import { useMutation } from "@tanstack/react-query";

import { removeProductFromCart } from "../api/removeProductFromCart";

export function useRemoveProductFromCart() {
  return useMutation({
    mutationFn: ({ cartId, cartItemId }: { cartId: number; cartItemId: number }) =>
      removeProductFromCart(cartId, cartItemId),
  });
}
