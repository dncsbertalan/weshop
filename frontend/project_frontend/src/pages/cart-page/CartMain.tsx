import { Button, Center, Flex, Heading, HStack, Separator, Spacer, VStack } from "@chakra-ui/react";
import { Footer } from "../footer/Footer";
import { NavBarFiller } from "../navigation-bar/NavBarFiller";
import { GlobalNavBar } from "../navigation-bar/GlobalNavBar";
import { CartItemSection } from "./CartItemSection";
import { useCart } from "@/context/cartContext";

export function CartMain() {
    const { cart } = useCart();

    const total = cart.cartItems.reduce((acc, item) => acc + item.price, 0);

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
                <HStack justifyContent="center" alignItems="flex-start" gap={80} width="100%" maxWidth="8xl">
                    <CartItemSection />

                    <Flex
                        borderRadius={15}
                        padding="20px"
                        backgroundColor="whiteAlpha.800"
                        shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
                        backdropFilter="saturate(180%) blur(20px)"
                        width={300}
                        height={200}
                    >
                        <VStack alignItems={"flex-start"} width="100%">
                            <Heading size="2xl">Total</Heading>
                            <Spacer />
                            <HStack width="100%">
                                <Spacer />
                                <Heading size="5xl">{total} Ft</Heading>
                            </HStack>
                            <Separator size="lg" />
                            <Button rounded="full">
                                Checkout
                            </Button>
                        </VStack>
                    </Flex>
                </HStack>
            </Center>

            <Spacer />
            <Footer />
        </Flex>
    );
}