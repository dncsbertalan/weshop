import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/deleteProduct";
import { ProductKeys } from "@/features/products/ProductKeys";
import { toaster } from "@/components/ui/toaster";

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
