import { CreateProductRequestDto } from "@/dtos/product/CreateProductRequestDto";
import { Portal, Button, CloseButton, Dialog } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateProductDialogBody } from "./CreateProductDialog.Body";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useQueryClient } from "@tanstack/react-query";
import { ProductKeys } from "@/features/products/ProductKeys";

export function CreatePorductDialog() {
  const queryClient = useQueryClient();
  const createProductForm = useForm<CreateProductRequestDto>();

  const { handleSubmit } = createProductForm;
  const { mutateAsync, isPending } = useCreateProduct();

  const onSubmit = async (data: CreateProductRequestDto) => {
    mutateAsync(data).then(() => queryClient.invalidateQueries({ queryKey: [ProductKeys.Products] }));
  };

  return (
    <FormProvider {...createProductForm}>
      <Dialog.Root closeOnInteractOutside={false} placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button variant="outline">Add new product</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content rounded="3xl" maxHeight="90%">
              <Dialog.Header>
                <Dialog.Title>Add new product</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body overflow="auto">
                <CreateProductDialogBody />
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" rounded="full">
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button type="submit" rounded="full" onClick={handleSubmit(onSubmit)} loading={isPending}>
                  Create product
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" rounded="full" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </FormProvider>
  );
}
