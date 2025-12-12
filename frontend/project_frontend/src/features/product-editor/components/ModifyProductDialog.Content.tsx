import { Button, Text, useDialogContext } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";

import { Dialog } from "@/components/Dialog";
import { DialogContent } from "@/components/Dialog.Content";
import { centralToaster } from "@/components/toaster/centralToasterDef";
import { UpdateProductRequestDto } from "@/dtos/request/product/UpdateProductRequestDto";
import { ProductDto } from "@/dtos/response/product/ProductDto";
import { ProductKeys } from "@/features/products/ProductKeys";

import { updateProduct } from "../api/updateProduct";
import { ModifyProductDialogBody } from "./ModifyProductDialog.Body";

interface ModifyProductDialogContentProps {
  productId: number;
  product: ProductDto;
}

export function ModifyProductDialogContent({ productId, product }: ModifyProductDialogContentProps) {
  const queryClient = useQueryClient();

  const defaultValues: UpdateProductRequestDto = useMemo(
    () => ({
      name: product.name,
      availableQuantity: product.availableQuantity,
      categoryIds: product.categories.map(({ id }) => id.toString()),
      description: product.description ?? null,
      price: product.price,
      image: null,
    }),
    [product.availableQuantity, product.categories, product.description, product.name, product.price],
  );

  const modifyProductForm = useForm<UpdateProductRequestDto>({
    defaultValues,
    disabled: !product,
  });
  const { setOpen } = useDialogContext();

  const { control, reset, handleSubmit } = modifyProductForm;
  const { mutate, isPending } = useMutation({
    mutationFn: async (createProductRequest: UpdateProductRequestDto) =>
      await updateProduct(productId, createProductRequest),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ProductKeys.Products] });
      void queryClient.invalidateQueries({ queryKey: [ProductKeys.Product, productId] });
      void queryClient.invalidateQueries({ queryKey: [ProductKeys.ProductImage, productId] });
      reset(defaultValues);
      setOpen(false);
      centralToaster.create({ title: "Succesfully saved changes", type: "success" });
    },
    onError: () => {
      centralToaster.create({ type: "error", closable: true, description: "Something went wrong." });
    },
  });

  const onSubmit = (data: UpdateProductRequestDto) => {
    mutate(data);
  };

  return (
    <FormProvider {...modifyProductForm}>
      <Form onSubmit={({ data }) => onSubmit(data)} control={control}>
        <DialogContent
          title="Edit product"
          body={<ModifyProductDialogBody productId={productId} />}
          footer={
            <Dialog
              body={<Text>Are you sure you want to save changes for this product?</Text>}
              trigger={
                <Button rounded="full" loading={isPending}>
                  Save changes
                </Button>
              }
              footer={
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                <Button onClick={handleSubmit(onSubmit)} rounded="full" loading={isPending}>
                  Save changes
                </Button>
              }
              title="Caution"
            />
          }
          minWidth={1000}
          minHeight={700}
        />
      </Form>
    </FormProvider>
  );
}
