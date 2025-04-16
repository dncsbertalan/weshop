import { Button, Center, Flex, Heading, HStack, Separator, Spacer, Text, VStack } from "@chakra-ui/react";
import { Footer } from "../page-components/footer/Footer";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { CartItemSection } from "./CartItemSection";
import { useCart } from "@/context/cartContext";
import { useNavigate } from "react-router";
import { Navigation } from "@/routes/navigation";
import { formatCurrency } from "@/utils/currency";

export function CartMain() {
    return (
        <Flex
            flexDirection="column"
            minHeight="100vh"
        >
            <GlobalNavBar />
            <NavBarFiller />

            <Center
                backgroundColor="bg-color"
                padding={5}
            >
                <Flex
                    width="100%" maxWidth="global-max-window-size"
                    justifyContent={{ base: "center", lg: "space-around" }} flexDirection={{ base: "column", lg: "row" }}
                >
                    <CartItemSection />

                    <CheckoutSection />
                </Flex>
            </Center>

            <Spacer />
            <Footer />
        </Flex>
    );
}

function CheckoutSection() {
    const { cart } = useCart();
    const navigate = useNavigate();
    const checkout = () => {
        navigate(Navigation.checkout);
    };

    const total = cart.cartItems?.reduce((acc, item) => acc + item.price, 0);
    return (
        <Flex
            borderRadius="10px"
            padding="20px"
            backgroundColor="whiteAlpha.800"
            shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
            backdropFilter="saturate(180%) blur(20px)"
            width={{ base: "800px", lg: "300px" }}
            height="min"
        >
            <VStack alignItems={"flex-start"} width="100%">
                <Heading lineHeight="25px" fontSize="21px" fontWeight="500">Cart summary</Heading>

                <Flex width="100%" justifyContent="space-between">
                    <Text lineHeight="24px" fontSize="16px">Subtotal</Text>
                    <Text lineHeight="24px" fontSize="16px">{formatCurrency(total)} Ft</Text>
                </Flex>

                <Flex width="100%" justifyContent="space-between">
                    <Text lineHeight="24px" fontSize="16px">VAT</Text>
                    <Text lineHeight="24px" fontSize="16px">{formatCurrency(Math.ceil(total * 0.27))} Ft</Text>
                </Flex>

                <Flex width="100%" justifyContent="space-between">
                    <Text lineHeight="24px" fontSize="16px">Rounding</Text>
                    <Text lineHeight="24px" fontSize="16px">0 Ft</Text>
                </Flex>

                <Flex width="100%" justifyContent="space-between">
                    <Text lineHeight="24px" fontSize="16px">Net total</Text>
                    <Text lineHeight="24px" fontSize="16px">{formatCurrency(Math.ceil(total * 0.73))} Ft</Text>
                </Flex>

                <Separator width="100%" />

                <Flex width="100%" justifyContent="space-between">
                    <Text lineHeight="24px" fontWeight="bold" fontSize="16px">Gross total</Text>
                    <Text lineHeight="24px" fontWeight="bold" fontSize="16px">{formatCurrency(total)} Ft</Text>
                </Flex>

                <Flex width="100%" justifyContent="flex-end">
                    <Button rounded="full" marginTop="18px" onClick={checkout}>
                        Proceed to checkout
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    );
}