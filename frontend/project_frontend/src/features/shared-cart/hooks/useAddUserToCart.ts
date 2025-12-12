import { useMutation, useQueryClient } from "@tanstack/react-query";

import { centralToaster } from "@/components/toaster/centralToasterDef";
import { AddUserToCartRequestDto } from "@/dtos/request/cart/AddUserToCartRequestDto";

import { CartKeys } from "../../cart/CartKeys";
import { addUserToCart } from "../api/addUserToCart";

export function useAddUserToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, userData }: { cartId: number; userData: AddUserToCartRequestDto }) =>
      addUserToCart(cartId, userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
      centralToaster.create({ type: "success", description: "Successfully added to your cart." });
    },
    onError: () => {
      centralToaster.create({ type: "error", description: "Something went wrong." });
    },
  });
}
