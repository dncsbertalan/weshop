import { useMutation } from "@tanstack/react-query";
import { modifyProductInCart } from "../api/modifyProductInCart";

export function useModifyProductInCart() {
  return useMutation({
    mutationFn: ({ cartId, cartItemId, quantity }: { cartId: number; cartItemId: number; quantity: number }) =>
      modifyProductInCart(cartId, cartItemId, quantity),
  });
}
