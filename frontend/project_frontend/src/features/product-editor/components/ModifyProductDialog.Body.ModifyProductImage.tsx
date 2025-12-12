import { Button, FileUpload } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { LuFileImage } from "react-icons/lu";

import { UpdateProductRequestDto } from "@/dtos/request/product/UpdateProductRequestDto";
import { getFieldKeys } from "@/utils/getFieldKeys";

import { UploadProductImageList } from "./UploadProductImageList";

const modifyProductKeys = getFieldKeys(UpdateProductRequestDto);

export function ModifyProductDialogBodyModifyProductImage() {
  const { control } = useFormContext<UpdateProductRequestDto>();

  return (
    <Controller
      name={modifyProductKeys.image}
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
