import { Button, Field, FileUpload } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { LuFileImage } from "react-icons/lu";

import { CreateProductRequestDto } from "@/dtos/request/product/CreateProductRequestDto";
import { getFieldKeys } from "@/utils/getFieldKeys";

import { UploadProductImageList } from "./UploadProductImageList";

const upsertProductKeys = getFieldKeys(CreateProductRequestDto);

export function UploadProductImage() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateProductRequestDto>();

  return (
    <Field.Root invalid={!!errors.image}>
      <Field.Label>Product image</Field.Label>

      <Controller
        name={upsertProductKeys.image}
        control={control}
        render={({ field }) => (
          <FileUpload.Root
            accept="image/*"
            maxFiles={1}
            onFileChange={(details) => field.onChange(details.acceptedFiles)}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button variant="outline" size="sm" rounded="full">
                <LuFileImage /> Upload Images
              </Button>
            </FileUpload.Trigger>
            <UploadProductImageList />
          </FileUpload.Root>
        )}
      />

      <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
    </Field.Root>
  );
}
