import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/deleteProduct";
import { ProductKeys } from "@/features/products/ProductKeys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: void queryClient.invalidateQueries({ queryKey: [ProductKeys.Products] }),
  });
}
