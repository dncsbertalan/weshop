import { Center, Flex, For, VStack, Box, Spacer } from "@chakra-ui/react";
import { Footer } from "../Footer";
import { NavigationBar } from "../NavigationBar"
import { useQuery } from "@tanstack/react-query";
import { CartItemHCard } from "@/reusable_components/product/CartItemHCard";
import { NavBarFiller } from "../NavBarFiller";
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
                background="purple"
                padding={5}
            >
                <Flex background="red.500" borderRadius={10} padding={5}>
                    <VStack>
                        <Box background="gray" padding={3}>
                            {/*total*/}összeg
                        </Box>
                        <For each={cart}>
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