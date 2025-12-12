import { useMutation, useQueryClient } from "@tanstack/react-query";

import { messageToaster } from "@/components/toaster/messageToasterDef";

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
    onError: () => {
      messageToaster.create({ type: "error", closable: true, description: "Something went wrong." });
    },
  });
}
