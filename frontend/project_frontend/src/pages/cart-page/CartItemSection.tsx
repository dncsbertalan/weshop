import { CartItemHCard } from "@/components/product/CartItemHCard";
import { useCart } from "@/context/cartContext";
import { VStack, For, Flex, Button, EmptyState, Spinner } from "@chakra-ui/react";
import { Navigation } from "@/routes/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

export function CartItemSection() {
    const { cart, cartIsPending, cartIsError } = useCart();

    if (cartIsError) {
        return (
            <CartItemSectionError />
        );
    }
    else if (!cartIsPending && (cart.cartItems?.length === 0 || cart.cartItems === undefined)) {
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

function CartItemSectionLoading() {
    return (
        <Spinner
            size="xl"
            borderWidth="4px"
            css={{ "--spinner-track-color": "colors.gray.200" }}
        />
    );
}

function CartItemSectionEmpty() {
    return (
        <EmptyState.Root
            size="lg"
            backgroundColor="whiteAlpha.800"
            backdropFilter="saturate(180%) blur(20px)"
            borderRadius={18}
            width="500px"
            shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
        >
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <MdOutlineShoppingCart />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>Your cart is empty</EmptyState.Title>
                    <EmptyState.Description>
                        Explore our products and add items to your cart
                    </EmptyState.Description>
                </VStack>
                <Link to={Navigation.home}>
                    <Button rounded="full">See products</Button>
                </Link>
            </EmptyState.Content>
        </EmptyState.Root>
    );
}

function CartItemSectionError() {
    return (
        <div>ERROR IN THE CART</div>
    );
}