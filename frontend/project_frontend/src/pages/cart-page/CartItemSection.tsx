import { CartItemHCard } from "@/components/product/CartItemHCard";
import { useCart } from "@/context/cartContext";
import { VStack, For, Flex, HStack, Heading, Spacer, Separator, Button } from "@chakra-ui/react";
import { CartItemsSectionEmpty } from "./CartItemsSectionEmpty";

export function CartItemSection() {
    const { cart } = useCart();

    if (cart.cartItems.length === 0) {
        return (
            <CartItemsSectionEmpty />
        );
    }

    const total = cart.cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <HStack alignItems="flex-start" gap={10} width="100%" maxWidth="8xl">
            <Flex
                borderRadius={15}
                padding="20px"
                backgroundColor="whiteAlpha.800"
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

            <Spacer />

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
    );
}