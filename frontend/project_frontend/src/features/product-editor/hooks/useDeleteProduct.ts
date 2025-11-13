import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@/components/ui/toaster";
import { ProductKeys } from "@/features/products/ProductKeys";

import { deleteProduct } from "../api/deleteProduct";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductKeys.Products] });
      toaster.create({ title: "Successfully deleted product", type: "success" });
    },
  });
}
