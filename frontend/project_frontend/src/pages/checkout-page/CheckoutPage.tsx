import { Center, Flex, Spacer } from "@chakra-ui/react";

import { Footer } from "@/components/footer/Footer";
import { useCart } from "@/context/cartContext";

import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller";
import { CheckoutSteps } from "./CheckoutSteps";

export function CheckoutPage() {
  const { createOrderIsPending, createOrderIsSuccess } = useCart();

  return (
    <Flex flexDirection="column" minHeight="100vh" pos="relative">
      <GlobalNavBar />
      <NavBarFiller />

      <Center backgroundColor="bg-color" padding="20px">
        {/*createOrderIsPending &&
                    <Flex>
                        LOADING
                    </Flex>
                */}
        {/*createOrderIsSuccess &&
                    <Flex width="100%" height="500px" backgroundColor="red">
                        SUCCESS
                    </Flex>
                */}
        <CheckoutSteps />
      </Center>

      <Spacer />
      <Footer />
    </Flex>
  );
}
