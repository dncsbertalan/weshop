import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormProvider, useForm } from "react-hook-form";

import { DialogContent } from "@/components/Dialog.Content";
import { toaster } from "@/components/ui/toaster";
import { CreateProductRequestDto } from "@/dtos/request/product/CreateProductRequestDto";
import { ProductKeys } from "@/features/products/ProductKeys";

import { createProduct } from "../api/createProduct";
import { CreateProductDialogContentBody } from "./CreateProductDialog.Content.Body";

export function CreateProductDialogContent() {
  const queryClient = useQueryClient();

  const createProductForm = useForm<CreateProductRequestDto>();

  const { reset, control } = createProductForm;
  const { mutate, isPending } = useMutation({
    mutationFn: async (createProductRequest: CreateProductRequestDto) => await createProduct(createProductRequest),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ProductKeys.Products] });
      reset();
      toaster.create({ title: "Succesfully created product", type: "success" });
    },
  });

  const onSubmit = (data: CreateProductRequestDto) => {
    mutate(data);
  };

  return (
    <FormProvider {...createProductForm}>
      <Form onSubmit={({ data }) => onSubmit(data)} control={control}>
        <DialogContent
          title="Add new product"
          body={<CreateProductDialogContentBody />}
          footer={
            <Button type="submit" rounded="full" loading={isPending}>
              Create product
            </Button>
          }
        />
      </Form>
    </FormProvider>
  );
}
