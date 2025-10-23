import { Center, Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";
import { Footer } from "../page-components/footer/Footer";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { ProductSection } from "./ProductsSection";
import { ScrollToTopButton } from "@/components/button/ScrollToTopButton";
import { Toaster } from "@/components/ui/toaster";
import { ProductFilterProvider } from "@/features/products/contexts/ProductFilterContext";
import { ProductFilters } from "./ProductFilters";

export function MainPage() {
  return (
    <ProductFilterProvider>
      <Flex direction="column" minHeight="100vh">
        <GlobalNavBar />
        <NavBarFiller />

        <Toaster />

        <Center
          //backgroundImage="linear-gradient(45deg, #845ec2, #d65db1, #ff6f91, #ff9671, #ffc75f, #f9f861)"
          //backgroundImage="linear-gradient( #BDD5AF, #ffffff, #BDD5AF)"
          backgroundImage="linear-gradient(135deg, #f4fff6 0%, #e2f5e7 40%, #cfe9d8 100%)"
          //backgroundColor={{base: "red", sm: "blue", md: "purple", lg: "pink", xl: "bg-color"}}
          animation="bg-animation"
          backgroundSize="400%"
          bgAttachment="fixed"
          flexDirection="column"
          paddingY={2}
        >
          <ScrollToTopButton />

          <ProductFilters />

          <Grid
            templateColumns={{ base: "1fr" }}
            //bgColor="red.300"
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

        <Spacer />

        <Footer />
      </Flex>
    </ProductFilterProvider>
  );
}
