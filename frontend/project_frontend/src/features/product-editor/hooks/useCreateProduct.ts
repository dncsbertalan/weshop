import { useMutation } from "@tanstack/react-query";

import { CreateProductRequestDto } from "@/dtos/request/product/CreateProductRequestDto";

import { createProduct } from "../api/createProduct";

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (createProductRequest: CreateProductRequestDto) => await createProduct(createProductRequest),
  });
}
