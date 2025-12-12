import { Field, HStack, Input, InputGroup, NumberInput, Stack, Text, Textarea } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { CreateProductRequestDto } from "@/dtos/request/product/CreateProductRequestDto";
import { getFieldKeys } from "@/utils/getFieldKeys";

import { CreateProductDialogCategorySelector } from "./CreateProductDialog.CategorySelector";
import { UploadProductImage } from "./UploadProductImage";

const upsertProductKeys = getFieldKeys(CreateProductRequestDto);

export function CreateProductDialogContentBody() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateProductRequestDto>();

  return (
    <Stack gap={2}>
      <Text>Create a new product by filling the form.</Text>

      <Field.Root required invalid={!!errors.name}>
        <Field.Label>
          Name
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          {...register(upsertProductKeys.name, {
            required: "Product name is required",
          })}
        />
        <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
      </Field.Root>

      <HStack height="fit-content" alignItems="flex-start" width="100%">
        <Field.Root required invalid={!!errors.price}>
          <Field.Label>
            Price
            <Field.RequiredIndicator />
          </Field.Label>
          <NumberInput.Root min={0}>
            <InputGroup endElement="Ft">
              <NumberInput.Input
                {...register(upsertProductKeys.price, {
                  required: "Product price is required",
                })}
              />
            </InputGroup>
          </NumberInput.Root>
          <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.availableQuantity}>
          <Field.Label>
            Available quantity
            <Field.RequiredIndicator />
          </Field.Label>
          <NumberInput.Root width="100%" min={0}>
            <NumberInput.Input
              {...register(upsertProductKeys.availableQuantity, {
                required: "Product available quantity is required",
              })}
            />
          </NumberInput.Root>
          <Field.ErrorText>{errors.availableQuantity?.message}</Field.ErrorText>
        </Field.Root>
      </HStack>

      <Field.Root required invalid={!!errors.description}>
        <Field.Label>Description</Field.Label>
        <Textarea maxHeight="7lh" autoresize {...register(upsertProductKeys.description)} />
        <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
      </Field.Root>

      <CreateProductDialogCategorySelector />

      <UploadProductImage />
    </Stack>
  );
}
