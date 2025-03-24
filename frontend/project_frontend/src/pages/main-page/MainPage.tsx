import { Center, Flex, Spacer } from "@chakra-ui/react";
import { Footer } from "../footer/Footer";
import { FiltersSection } from "./FiltersSection";
import { NavBarFiller } from "../navigation-bar/NavBarFiller"
import { GlobalNavBar } from "../navigation-bar/GlobalNavBar";
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
                    padding="20px 50px"
                    gap={10}
                    width="100%"
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