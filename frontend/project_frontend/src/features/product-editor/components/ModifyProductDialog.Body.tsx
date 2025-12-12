import { DataList, HStack, Image, Stack } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

import { EditableInput } from "@/components/editable/EditableInput";
import { EditableTextArea } from "@/components/editable/EditableTextarea";
import { UpdateProductRequestDto } from "@/dtos/request/product/UpdateProductRequestDto";
import { useGetProduct } from "@/features/products/hooks/useGetProduct";
import { useGetProductImage } from "@/features/products/hooks/useGetProductImage";
import { getFieldKeys } from "@/utils/getFieldKeys";

import { ModifyProductDialogBodyModifyProductImage } from "./ModifyProductDialog.Body.ModifyProductImage";
import { ModifyProductDialogCategorySelector } from "./ModifyProductDialog.CategorySelector";

const updateRequestKeys = getFieldKeys(UpdateProductRequestDto);

interface ModifyProductDialogBodyProps {
  productId: number;
}

export function ModifyProductDialogBody({ productId }: ModifyProductDialogBodyProps) {
  const { data: product } = useGetProduct({ productId });
  const { data: imageUrl } = useGetProductImage({ productId });
  const { control } = useFormContext<UpdateProductRequestDto>();

  return (
    <Stack flex={1}>
      {product && (
        <HStack gap={10} alignItems="start">
          <Stack>
            <Image src={imageUrl ?? undefined} height={350} width={300} />
            <ModifyProductDialogBodyModifyProductImage />
          </Stack>

          <Stack width="full" justifyContent="start">
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Product ID</DataList.ItemLabel>
                <DataList.ItemValue>{product.id}</DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel>Product name</DataList.ItemLabel>
                <DataList.ItemValue asChild>
                  <Controller
                    name={updateRequestKeys.name}
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <EditableInput
                        onValueChange={(event) => onChange(event.value)}
                        onInteractOutside={() => onBlur()}
                        value={value}
                      />
                    )}
                  />
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel>Categories</DataList.ItemLabel>
                <DataList.ItemValue asChild>
                  <ModifyProductDialogCategorySelector />
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel>Description</DataList.ItemLabel>
                <DataList.ItemValue asChild>
                  <Controller
                    name={updateRequestKeys.description}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <EditableTextArea
                        onValueChange={(event) => onChange(event.value)}
                        onBlur={onBlur}
                        value={value ?? ""}
                      />
                    )}
                  />
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel>Price</DataList.ItemLabel>
                <DataList.ItemValue asChild>
                  <Controller
                    name={updateRequestKeys.price}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <EditableInput
                        onValueChange={(event) => onChange(event.value)}
                        onBlur={onBlur}
                        value={value.toString()}
                      />
                    )}
                  />
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Stock</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Controller
                    name={updateRequestKeys.availableQuantity}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <EditableInput
                        onValueChange={(event) => onChange(event.value)}
                        onBlur={onBlur}
                        value={value.toString()}
                      />
                    )}
                  />
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel>Is deleted</DataList.ItemLabel>
                <DataList.ItemValue>{product.isDeleted ? "Yes" : "No"}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Stack>
        </HStack>
      )}
    </Stack>
  );
}
