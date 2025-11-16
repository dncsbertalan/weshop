import { useMutation } from "@tanstack/react-query";

import { addUserToCart } from "../api/addUserToCart";
import { toaster } from "@/components/ui/toaster";

export function useAddUserToCart() {
  return useMutation({
    mutationFn: ({ cartId, email }: { cartId: number; email: string }) => addUserToCart(cartId, email),
    onSuccess: () => toaster.create({ type: "success", title: "Successfully added to your cart" }),
  });
}
