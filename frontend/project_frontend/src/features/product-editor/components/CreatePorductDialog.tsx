import { CreateProductRequestDto } from "@/dtos/product/CreateProductRequestDto";
import { Button } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateProductDialogBody } from "./CreateProductDialog.Body";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductKeys } from "@/features/products/ProductKeys";
import { Dialog } from "@/components/Dialog";
import { createProduct } from "../api/createProduct";
import { toaster } from "@/components/ui/toaster";

export function CreatePorductDialog() {
  const queryClient = useQueryClient();
  const createProductForm = useForm<CreateProductRequestDto>({
    defaultValues: {
      availableQuantity: 0,
      categoryIds: [],
      description: "",
      image: undefined,
      name: "",
      price: 0,
    },
  });

  const { handleSubmit, reset } = createProductForm;
  const { mutate, isPending } = useMutation({
    mutationFn: async (createProductRequest: CreateProductRequestDto) => await createProduct(createProductRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductKeys.Products] });
      reset();
      toaster.create({ title: "Succesfully created product", type: "success" });
    },
  });

  const onSubmit = async (data: CreateProductRequestDto) => {
    mutate(data);
  };

  return (
    <FormProvider {...createProductForm}>
      <Dialog
        title="Add new product"
        body={<CreateProductDialogBody />}
        trigger={<Button>Add new product</Button>}
        footer={
          <Button type="submit" rounded="full" onClick={handleSubmit(onSubmit)} loading={isPending}>
            Create product
          </Button>
        }
      />
    </FormProvider>
  );
}
