import { Badge, Image, Separator, Spinner, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router";

import { MultilineText } from "@/components/MultilineText";
import { PageContainer } from "@/components/PageContainer";
import { AddProductToCartButton } from "@/components/product/AddProductToCartButton";
import { ProductAvailabilityLabel } from "@/components/product/ProductAvailabilityLabel";
import { useGetProduct } from "@/features/products/hooks/useGetProduct";
import { useGetProductImage } from "@/features/products/hooks/useGetProductImage";
import { formatCurrencyFt } from "@/utils/currency";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { data: product, isPending: productLoading } = useGetProduct({ productId });
  const { data: image } = useGetProductImage({ productId });

  return (
    <PageContainer>
      {productLoading && (
        <Stack width="full" height="100%" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Stack>
      )}
      {product && (
        <Stack width="full" paddingTop={5} paddingBottom={20}>
          <Text fontSize="3xl" fontWeight="medium">
            {product.name}
          </Text>

          <Stack direction={{ base: "column", md: "row" }} width="full" gap={10}>
            <Stack width={{ base: "full", md: "40%" }} alignItems="center">
              <Image src={image ?? undefined} minHeight={400} />
            </Stack>

            <Stack flex={1} gap={6}>
              <Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack gap={0}>
                    <Text fontSize="2xl" fontWeight="bold">
                      {formatCurrencyFt(product.price)}
                    </Text>
                    <ProductAvailabilityLabel availableQuantity={product.availableQuantity} />
                  </Stack>
                  <AddProductToCartButton productId={productId} size="xl" rounded="xl" />
                </Stack>

                <Stack direction="row" gap={2}>
                  {product.categories.map(({ id, name }) => (
                    <Badge key={id}>{name}</Badge>
                  ))}
                </Stack>
              </Stack>

              <Separator />

              <MultilineText text={product.description ?? ""} />
            </Stack>
          </Stack>
        </Stack>
      )}
    </PageContainer>
  );
}
