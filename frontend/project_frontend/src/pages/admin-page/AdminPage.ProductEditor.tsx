import { useGetProduct } from "@/features/products/hooks/useGetProduct";
import { useGetProductImage } from "@/features/products/hooks/useGetProductImage";
import { formatCurrencyFt } from "@/utils/currency";
import { DataList, HStack, Image, Stack } from "@chakra-ui/react";

interface AdminPageProductEditorProps {
  productId: number | null;
}

export function AdminPageProductEditor({ productId }: AdminPageProductEditorProps) {
  const { data: product } = useGetProduct({ productId });
  const { data: imageUrl } = useGetProductImage({ productId });

  return (
    <Stack flex={1}>
      {product && (
        <HStack justifyContent="space-between">
          <Stack>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Product ID</DataList.ItemLabel>
                <DataList.ItemValue>{product.id}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Product name</DataList.ItemLabel>
                <DataList.ItemValue>{product.name}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Categories</DataList.ItemLabel>
                <DataList.ItemValue>{product.categories.map(({ name }) => name).join(", ")}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Description</DataList.ItemLabel>
                <DataList.ItemValue>{product.description}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Price</DataList.ItemLabel>
                <DataList.ItemValue>{formatCurrencyFt(product.price)}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Stock</DataList.ItemLabel>
                <DataList.ItemValue>{product.availableQuantity}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Is deleted</DataList.ItemLabel>
                <DataList.ItemValue>{product.isDeleted ? "Yes" : "No"}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Stack>
          <Image src={imageUrl ?? undefined} height={250} />
        </HStack>
      )}
    </Stack>
  );
}
