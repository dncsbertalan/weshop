import { Center, Flex, Spacer } from "@chakra-ui/react";
import { GlobalNavBar } from "../navigation-bar/GlobalNavBar";
import { NavBarFiller } from "../navigation-bar/NavBarFiller";
import { Footer } from "../footer/Footer";

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
            >
                hali
            </Center>
            <Flex bg="red" p="20" w="10" h={100}>
                heli
            </Flex>
            
            <Spacer />
            <Footer />
        </Flex>
    );
}