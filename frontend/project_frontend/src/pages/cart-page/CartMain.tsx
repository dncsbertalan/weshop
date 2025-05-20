import { Button, Flex, Heading, Separator, Spacer, Text, VStack } from "@chakra-ui/react";
import { Footer } from "../page-components/footer/Footer";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { CartItemsSection } from "./CartItemsSection";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router";
import { Navigation } from "@/routes/navigation";
import { formatCurrency } from "@/utils/currency";
import { InviteUserToCart } from "./InviteUserToCart";
import { useUser } from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

export function CartMain() {
    const { user, activeCartId } = useUser();
    const isOwnCart = user?.cartId === activeCartId;

    return (
        <Flex
            flexDirection="column"
            minHeight="100vh"
        >
            <GlobalNavBar />
            <NavBarFiller />
            <Toaster />

            <Flex
                backgroundColor="bg-color"
                padding="20px"
                justifyContent="center"
            >
                <Flex
                    width="100%" maxWidth="global-max-window-size"
                    justifyContent={{ base: "center", lg: "space-around" }} flexDirection={{ base: "column", lg: "row" }}
                >
                    <Flex flexDirection="column" alignItems="center">
                        <CartItemsSection />
                    </Flex>

                    <Flex flexDirection="column" gap="30px" alignItems="center">
                        <CheckoutSection />
                        {isOwnCart && <InviteUserToCart />}
                    </Flex>
                </Flex>
            </Flex>

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
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cart) {
            setTotal(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
        }
    }, [cart])

    return (
        <Flex
            borderRadius="10px"
            padding="20px"
            backgroundColor="whiteAlpha.800"
            shadow="0px 10px 20px rgba(0, 0, 0, 0.09), 0px 0px 1px rgba(0, 0, 0, 0.2)"
            backdropFilter="saturate(180%) blur(20px)"
            width={{ base: "100%", sm: "520px", md: "700px", lg: "285px", xl: "300px" }}
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