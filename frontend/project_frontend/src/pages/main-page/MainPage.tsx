import { Center, Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";
import { Footer } from "../page-components/footer/Footer";
import { FiltersSection, FiltersSection2 } from "./filter-section/FiltersSection";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller"
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { ProductSection } from "./ProductsSection";
import { ScrollToTopButton } from "@/components/button/ScrollToTopButton";
import { FilterFullScreen, FilterFullScreen2 } from "./filter-section/FilterFullScreen";
import { Toaster } from "@/components/ui/toaster";

export function MainPage() {

    return (
        <Flex
            direction="column"
            minHeight="100vh"
        >
            <GlobalNavBar />
            <NavBarFiller />

            <Toaster />

            <Center
                //backgroundImage="linear-gradient(45deg, #845ec2, #d65db1, #ff6f91, #ff9671, #ffc75f, #f9f861)" 
                //backgroundImage="linear-gradient( #BDD5AF, #ffffff, #BDD5AF)" 
                //backgroundImage="linear-gradient(135deg, #f4fff6 0%, #e2f5e7 40%, #cfe9d8 100%)" 
                //backgroundColor={{base: "red", sm: "blue", md: "purple", lg: "pink", xl: "bg-color"}} 
                animation="bg-animation"
                backgroundSize="400%"
                bgAttachment="fixed"
                flexDirection="column"
            >
                {/*<FiltersSectionButton />*/}
                <Flex
                    position="relative"
                    padding="20px 0px"
                    justifyContent="space-evenly"
                    alignItems={{ base: "center", "max-screen-width": "flex-start" }}
                    width="100%"
                    maxWidth="global-max-window-size"
                    margin="0px 20px"
                    height="max"
                    flexDirection={{ base: "column", "max-screen-width": "row" }}
                >

                    <ScrollToTopButton />
                    <FilterFullScreen />
                    <FiltersSection />
                    <ProductSection />
                </Flex>
                <Grid templateColumns={{base: "1fr", lg: "300px 1fr"}} width="100%" gap="20px" padding="0px 20px">
                    <GridItem colSpan={1} textAlign="center">
                        <FilterFullScreen2 />
                        <FiltersSection2 />
                    </GridItem>
                    <GridItem colSpan={1} alignItems="center" textAlign="center">
                        {/*<ProductSection />*/}
                        <ProductSection />
                    </GridItem>
                </Grid>
            </Center>

            <Spacer />

            <Footer />
        </Flex>
    );
}