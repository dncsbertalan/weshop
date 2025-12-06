import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";

import { addProductToCart } from "../api/addProductToCart";
import { CartKeys } from "../CartKeys";

export function useAddProductToCart() {
  const queryClient = useQueryClient();
  const { user } = useAuthentication();

  return useMutation({
    mutationFn: ({ productId }: { productId: number }) => {
      if (!user) {
        throw new Error();
      }

      return addProductToCart(user.activeCartId, productId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
    },
  });
}
