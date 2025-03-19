import { Center, Flex, For, VStack, Spacer } from "@chakra-ui/react";
import { Footer } from "../footer/Footer";
import { NavigationBar } from "../navigation-bar/NavigationBar"
import { useQuery } from "@tanstack/react-query";
import { CartItemHCard } from "@/components/product/CartItemHCard";
import { NavBarFiller } from "../navigation-bar/NavBarFiller";
import { getCart } from "@/api/cartApi";

export function CartMain() {
    const {
        //isPending,
        //isError,
        data: cart
    } = useQuery({
        queryKey: ["cartItems"],
        queryFn: getCart
    });

    return (
        <Flex
            flexDirection="column"
            minHeight="100vh"
        >
            <NavigationBar />
            <NavBarFiller />

            <Center
                backgroundColor="#EAEAEA"
                padding={5}
            >
                <Flex
                    borderRadius={15}
                    padding="20px"
                    backgroundColor="whiteAlpha.800"
                    //width="100%"
                    shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
                    backdropFilter="saturate(180%) blur(20px)"
                >
                    <VStack>
                        <For each={cart?.cartItems}>
                            {(item) => (
                                <CartItemHCard cartItem={item} />
                            )}
                        </For>
                    </VStack>
                </Flex>
            </Center>

            <Spacer />
            <Footer />
        </Flex>
    );
}