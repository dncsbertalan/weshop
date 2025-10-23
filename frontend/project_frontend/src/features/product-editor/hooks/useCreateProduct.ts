import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/createProduct";
import { CreateProductRequestDto } from "@/dtos/product/CreateProductRequestDto";

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (createProductRequest: CreateProductRequestDto) =>
      await createProduct(createProductRequest),
  });
}
