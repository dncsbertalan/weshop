import { Center, Flex, Spacer } from "@chakra-ui/react";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller";
import { Footer } from "../page-components/footer/Footer";
import { CheckoutSteps } from "./CheckoutSteps";

export function CheckoutPage() {
    return (
        <Flex
            flexDirection="column"
            minHeight="100vh"
            pos="relative"
        >
            <GlobalNavBar />
            <NavBarFiller />

            <Center
                backgroundColor="#EAEAEA"
                padding={5}
                minHeight="100%"
            >
                <CheckoutSteps />
            </Center>
            
            <Spacer />
            <Footer />
        </Flex>
    );
}