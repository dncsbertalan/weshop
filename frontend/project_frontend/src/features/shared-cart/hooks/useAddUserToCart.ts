import { useMutation } from "@tanstack/react-query";
import { addUserToCart } from "../api/addUserToCart";

export function useAddUserToCart() {
  return useMutation({
    mutationFn: ({ cartId, email }: { cartId: number; email: string }) => addUserToCart(cartId, email),
  });
}
