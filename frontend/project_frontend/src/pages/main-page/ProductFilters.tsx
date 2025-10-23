import { GlassContainer } from "@/components/GlassContainer";
import { ProductCategorySelect } from "@/features/products/components/ProductCategorySelect";
import { ProductMaxPriceFilter } from "@/features/products/components/ProductMaxPriceFilter";
import { ProductMinPriceFilter } from "@/features/products/components/ProductMinPriceFilter";
import { ProductNameSearch } from "@/features/products/components/ProductNameSearch";
import { Stack } from "@chakra-ui/react";

export function ProductFilters() {
  return (
    <GlassContainer>
      <ProductNameSearch capsule />
      <Stack direction="row" gap={2}>
        <ProductMinPriceFilter />
        <ProductMaxPriceFilter />
        <ProductCategorySelect />
      </Stack>
    </GlassContainer>
  );
}
