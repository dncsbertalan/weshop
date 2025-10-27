import { ProductCategorySelect } from "@/features/products/components/ProductCategorySelect";
import { ProductMaxPriceFilter } from "@/features/products/components/ProductMaxPriceFilter";
import { ProductMinPriceFilter } from "@/features/products/components/ProductMinPriceFilter";
import { ProductNameSearch } from "@/features/products/components/ProductNameSearch";
import { Stack } from "@chakra-ui/react";

export function AdminPageProductFilters() {
  return (
    <Stack width="100%" direction="row" flex={1}>
      <Stack flex={2}>
        <ProductNameSearch label="Product name" />
      </Stack>
      <Stack flex={1}>
        <ProductMinPriceFilter />
      </Stack>
      <Stack flex={1}>
        <ProductMaxPriceFilter />
      </Stack>
      <Stack flex={1}>
        <ProductCategorySelect />
      </Stack>
    </Stack>
  );
}
