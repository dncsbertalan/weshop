import { FileUpload, Button } from "@chakra-ui/react";
import { LuFileImage } from "react-icons/lu";
import { UploadProductImageList } from "./UploadProductImageList";
import { CreateProductRequestDto } from "@/dtos/product/CreateProductRequestDto";
import { getFieldKeys } from "@/utils/getFieldKeys";
import { Controller, useFormContext } from "react-hook-form";

const upsertProductKeys = getFieldKeys(CreateProductRequestDto);

export function UploadProductImage() {
  const { control } = useFormContext<CreateProductRequestDto>();

  return (
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
  );
}
