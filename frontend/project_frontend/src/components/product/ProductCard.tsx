import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router";

import { useGetProductImage } from "@/features/products/hooks/useGetProductImage";
import { Product } from "@/models/Product";
import { Navigation } from "@/routes/navigation";
import { formatCurrencyFt } from "@/utils/currency";

import { AddProductToCartButton } from "./AddProductToCartButton";
import { ProductAvailabilityLabel } from "./ProductAvailabilityLabel";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { data: image } = useGetProductImage({ productId: product.id });

  return (
    <Flex
      overflow="hidden"
      width="full"
      height="fit-content"
      flexDirection="column"
      borderRadius="3xl"
      backgroundColor="bg-color-product-card"
      shadow="lg"
      _hover={{
        shadow: "2xl",
      }}
      transition="scale 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
    >
      <Link to={`${Navigation.product}${product.id}`}>
        <Image src={image ?? undefined} height={{ base: 220, xl: 250 }} width="full" fit="cover" />
      </Link>

      <Stack flexDirection="column" padding={5} paddingTop={2.5} width="full" height="100%">
        <Stack gap={0}>
          <Link to={`${Navigation.product}${product.id}`}>
            <Text fontSize="md" fontWeight="normal" lineHeight="22.4px">
              {product.name}
            </Text>
          </Link>

          <ProductAvailabilityLabel availableQuantity={product.availableQuantity} />

          <Text fontSize="lg" fontWeight="bold" alignSelf="end">
            {formatCurrencyFt(product.price)}
          </Text>
        </Stack>

        <AddProductToCartButton productId={product.id} size="xl" width="full" rounded="full" marginTop={2} />
      </Stack>
    </Flex>
  );
}
