import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "../api/addProductToCart";
import { CartKeys } from "../CartKeys";

export function useAddProductToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, productId }: { cartId: number; productId: number }) => addProductToCart(cartId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
    },
  });
}
