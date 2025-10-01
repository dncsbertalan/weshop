import { useGetProduct } from "@/features/products/hooks/useGetProduct";
import { formatCurrencyFt } from "@/utils/currency";
import { DataList, Stack } from "@chakra-ui/react";

interface AdminPageProductEditorProps {
  productId: number | null;
}

export function AdminPageProductEditor({
  productId,
}: AdminPageProductEditorProps) {
  const { data: product } = useGetProduct({ productId });
  console.log(productId);

  return (
    <Stack flex={1}>
      {product && (
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
            <DataList.ItemValue>
              {product.categories.map(({ name }) => name).join(", ")}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Description</DataList.ItemLabel>
            <DataList.ItemValue>{product.description}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Price</DataList.ItemLabel>
            <DataList.ItemValue>
              {formatCurrencyFt(product.price)}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Stock</DataList.ItemLabel>
            <DataList.ItemValue>{product.availableQuantity}</DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      )}
    </Stack>
  );
}
