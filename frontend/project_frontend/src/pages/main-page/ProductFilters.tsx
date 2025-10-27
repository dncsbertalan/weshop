import { GlassContainer } from "@/components/GlassContainer";
import { ProductCategorySelect } from "@/features/products/components/ProductCategorySelect";
import { ProductMaxPriceFilter } from "@/features/products/components/ProductMaxPriceFilter";
import { ProductMinPriceFilter } from "@/features/products/components/ProductMinPriceFilter";
import { ProductNameSearch } from "@/features/products/components/ProductNameSearch";
import { Stack } from "@chakra-ui/react";

export function ProductFilters() {
  return (
    <GlassContainer>
      <ProductNameSearch rounded="full" />
      <Stack direction="row" gap={2}>
        <ProductMinPriceFilter rounded="full" />
        <ProductMaxPriceFilter rounded="full" />
        <ProductCategorySelect rounded="full" />
      </Stack>
    </GlassContainer>
  );
}
