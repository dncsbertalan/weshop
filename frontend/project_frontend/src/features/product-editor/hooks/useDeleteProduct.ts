import { useMutation, useQueryClient } from "@tanstack/react-query";

import { centralToaster } from "@/components/toaster/centralToasterDef";
import { ProductKeys } from "@/features/products/ProductKeys";

import { deleteProduct } from "../api/deleteProduct";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ProductKeys.Products] });
      centralToaster.create({ title: "Successfully deleted product", type: "success" });
    },
  });
}
