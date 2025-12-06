import { Center } from "@chakra-ui/react";

import { ScrollToTopButton } from "@/components/button/ScrollToTopButton";
import { PageContainer } from "@/components/PageContainer";
import { ProductFilterProvider } from "@/features/products/components/ProductFilterProvider";

import { ProductFilters } from "./ProductFilters";
import { ProductSection } from "./ProductSection";

export function MainPage() {
  return (
    <ProductFilterProvider>
      <PageContainer>
        <Center flexDirection="column" marginTop={5} marginBottom={10} gap={10}>
          <ScrollToTopButton />

          <ProductFilters />

          <ProductSection />
        </Center>
      </PageContainer>
    </ProductFilterProvider>
  );
}
