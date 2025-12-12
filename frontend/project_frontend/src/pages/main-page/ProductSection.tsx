import { Stack } from "@chakra-ui/react";

import { useGetProducts } from "@/features/products/hooks/useGetProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";

import { Products } from "./Products";
import { ProductsEmpty } from "./Products.Empty";
import { ProductsSectionError } from "./Products.Error";
import { ProductSectionLoading } from "./Products.Loading";

export function ProductSection() {
  const { productFilters } = useProductFilters();
  const { data: products, isError, isPending } = useGetProducts({ productFilter: productFilters });

  return (
    <Stack direction="column" alignItems="center" width="100%" height="100%">
      {isError && <ProductsSectionError />}
      {isPending && <ProductSectionLoading />}
      {products && products.items.length > 0 && <Products products={products} />}
      {products && products.items.length === 0 && <ProductsEmpty />}
    </Stack>
  );
}
