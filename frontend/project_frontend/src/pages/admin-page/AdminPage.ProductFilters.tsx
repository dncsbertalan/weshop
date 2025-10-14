import { ProductCategorySelect } from "@/features/products/components/ProductCategorySelect";
import { ProductMaxPriceFilter } from "@/features/products/components/ProductMaxPriceFilter";
import { ProductMinPriceFilter } from "@/features/products/components/ProductMinPriceFilter";
import { ProductNameSearch } from "@/features/products/components/ProductNameSearch";
import { HStack, Stack } from "@chakra-ui/react";

export function AdminPageProductFilters() {
  return (
    <Stack width="100%">
      <ProductNameSearch label="Product name" />
      <HStack>
        <ProductMinPriceFilter />
        <ProductMaxPriceFilter />
      </HStack>
      <ProductCategorySelect />
    </Stack>
  );
}
