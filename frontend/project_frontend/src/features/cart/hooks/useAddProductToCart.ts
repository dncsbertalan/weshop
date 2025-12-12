import { useMutation, useQueryClient } from "@tanstack/react-query";

import { messageToaster } from "@/components/toaster/messageToasterDef";
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
      messageToaster.create({ type: "success", closable: true, description: "Added product to cart." });
    },
    onError: () => {
      messageToaster.create({ type: "error", closable: true, description: "Something went wrong." });
    },
  });
}
