import { useMutation, useQueryClient } from "@tanstack/react-query";

import { centralToaster } from "@/components/toaster/centralToasterDef";

import { CartKeys } from "../../cart/CartKeys";
import { removeUserFromCart } from "../api/removeUserFromCart";

export function useRemoveUserFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, userId }: { cartId: number; userId: string }) => removeUserFromCart(cartId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
      centralToaster.create({ type: "success", description: "Successfully removed removed from your cart." });
    },
    onError: () => {
      centralToaster.create({ type: "error", description: "Something went wrong." });
    },
  });
}
