import { Stack } from "@chakra-ui/react";

import { Container } from "@/components/Container";
import { ProductCategorySelect } from "@/features/products/components/ProductCategorySelect";
import { ProductMaxPriceFilter } from "@/features/products/components/ProductMaxPriceFilter";
import { ProductMinPriceFilter } from "@/features/products/components/ProductMinPriceFilter";
import { ProductNameSearch } from "@/features/products/components/ProductNameSearch";

export function ProductFilters() {
  return (
    <Container width={{ base: "100%", lg: "90%" }}>
      <Stack direction={{ base: "column", xl: "row" }} alignItems="end" gap={{ base: 4, xl: 10 }}>
        <ProductNameSearch rounded="full" width="100%" />

        <Stack direction={{ base: "column", md: "row" }} alignItems="end" width="100%" gap={4}>
          <ProductCategorySelect rounded="full" width="100%" minWidth={{ md: 200 }} />

          <Stack direction="row" width="100%" alignItems="end">
            <ProductMinPriceFilter rounded="full" width="100%" minWidth={{ md: 160 }} />
            <ProductMaxPriceFilter rounded="full" width="100%" minWidth={{ md: 160 }} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
