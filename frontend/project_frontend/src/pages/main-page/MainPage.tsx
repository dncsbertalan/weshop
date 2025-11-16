import { Center, Flex, Grid, GridItem, Stack } from "@chakra-ui/react";

import bg from "@/assets/bg-4.jpeg";
import { ScrollToTopButton } from "@/components/button/ScrollToTopButton";
import { PageContainer } from "@/components/PageContainer";
import { ProductFilterProvider } from "@/features/products/components/ProductFilterProvider";

import { ProductFilters } from "./ProductFilters";
import { ProductSection } from "./ProductsSection";

export function MainPage() {
  return (
    <ProductFilterProvider>
      <Flex
        direction="column"
        minHeight="100vh"
        width="100%"
        bgImage={`url(${bg})`}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgAttachment="fixed"
      >
        <Stack minHeight="100vh" width="100%" backdropFilter="blur(50px)" bgColor="whiteAlpha.50">
          <PageContainer>
            <Center flexDirection="column" paddingY={2}>
              <ScrollToTopButton />

              <ProductFilters />

              <Grid
                templateColumns={{ base: "1fr" }}
                width="100%"
                maxWidth="global-max-window-size"
                padding="20px 20px"
                gap={{ md: "15px", lg: "10px", xl: "20px" }}
              >
                <GridItem colSpan={1} marginX="auto" width="fit-content">
                  <ProductSection />
                </GridItem>
              </Grid>
            </Center>
          </PageContainer>
        </Stack>
      </Flex>
    </ProductFilterProvider>
  );
}
