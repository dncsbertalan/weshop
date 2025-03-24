import { CartItemHCard } from "@/components/product/CartItemHCard";
import { useCart } from "@/context/cartContext";
import { VStack, For, Flex } from "@chakra-ui/react";
import { CartItemSectionEmpty } from "./CartItemSectionEmpty";
import { CartItemSectionLoading } from "./CartItemSectionLoading";

export function CartItemSection() {
    const { cart, cartIsPending, cartIsError } = useCart();

    if (!cartIsPending && !cartIsError && cart.cartItems.length === 0) {
        return (
            <CartItemSectionEmpty />
        );
    }

    return (
        <Flex
            borderRadius={15}
            padding="20px"
            backgroundColor="whiteAlpha.800"
            shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
            backdropFilter="saturate(180%) blur(20px)"
        >
            {cartIsPending && <CartItemSectionLoading />}
            
            {!cartIsPending &&
            <VStack>
                <For each={cart?.cartItems}>
                    {(item) => (
                        <CartItemHCard cartItem={item} />
                    )}
                </For>
            </VStack>}
        </Flex>
    );
}