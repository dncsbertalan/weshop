import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToCart } from "../api/addUserToCart";
import { AddUserToCartRequestDto } from "@/dtos/request/cart/AddUserToCartRequestDto";
import { CartKeys } from "../CartKeys";

export function useAddUserToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, userData }: { cartId: number; userData: AddUserToCartRequestDto }) =>
      addUserToCart(cartId, userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
    },
    onError: (error) => {
      console.error("Error adding user to cart:", error);
    },
  });
}
