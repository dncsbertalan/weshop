import { Center, Flex, Spacer } from "@chakra-ui/react";
import { GlobalNavBar } from "../navigation-bar/GlobalNavBar";
import { NavBarFiller } from "../navigation-bar/NavBarFiller";
import { Footer } from "../footer/Footer";
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