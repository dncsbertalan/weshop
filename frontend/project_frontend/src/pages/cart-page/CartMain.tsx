import { Center, Flex, Spacer } from "@chakra-ui/react";
import { Footer } from "../footer/Footer";
import { NavBarFiller } from "../navigation-bar/NavBarFiller";
import { GlobalNavBar } from "../navigation-bar/GlobalNavBar";
import { CartItemSection } from "./CartItemSection";

export function CartMain() {
    return (
        <Flex
            flexDirection="column"
            minHeight="100vh"
        >
            <GlobalNavBar />
            <NavBarFiller />

            <Center
                backgroundColor="#EAEAEA"
                padding={5}
            >
                <CartItemSection />
            </Center>

            <Spacer />
            <Footer />
        </Flex>
    );
}