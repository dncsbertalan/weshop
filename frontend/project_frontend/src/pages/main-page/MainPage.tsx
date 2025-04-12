import { Center, Flex, Spacer } from "@chakra-ui/react";
import { Footer } from "../page-components/footer/Footer";
import { FiltersSection } from "./FiltersSection";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller"
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { ProductSection } from "./ProductsSection";

export function MainPage() {

    return (
        <Flex
            direction="column"
            minHeight="100vh"
        >
            <GlobalNavBar />
            <NavBarFiller />

            <Center backgroundColor="#EAEAEA">
                <Flex
                    padding="20px 20px"
                    gap={10}
                    width="100%"
                    maxWidth="global-max-window-size"
                    height="max"
                >

                    <FiltersSection />
                    <ProductSection />
                </Flex>
            </Center>

            <Spacer />

            <Footer />
        </Flex>
    );
}