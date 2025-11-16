import { Stack } from "@chakra-ui/react";

import { GlassContainer } from "@/components/GlassContainer";
import { ProductCategorySelect } from "@/features/products/components/ProductCategorySelect";
import { ProductMaxPriceFilter } from "@/features/products/components/ProductMaxPriceFilter";
import { ProductMinPriceFilter } from "@/features/products/components/ProductMinPriceFilter";
import { ProductNameSearch } from "@/features/products/components/ProductNameSearch";

export function ProductFilters() {
  return (
    <GlassContainer width="90%">
      <Stack direction={{ lgDown: "column", xl: "row" }} alignItems="end" gap={{ xl: 10 }}>
        <ProductNameSearch rounded="full" width="100%" />

        <Stack direction={{ mdDown: "column", xl: "row" }} width="100%">
          <ProductCategorySelect rounded="full" width="100%" minWidth={{ md: 200 }} />

          <Stack direction={{ smDown: "row", md: "row" }} width="100%">
            <ProductMinPriceFilter rounded="full" width="100%" minWidth={{ md: 160 }} />
            <ProductMaxPriceFilter rounded="full" width="100%" minWidth={{ md: 160 }} />
          </Stack>
        </Stack>
      </Stack>
    </GlassContainer>
  );
}
