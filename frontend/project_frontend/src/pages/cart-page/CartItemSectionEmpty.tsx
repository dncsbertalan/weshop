import { Navigation } from "@/routes/navigation";
import { Button, EmptyState, VStack } from "@chakra-ui/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

export function CartItemSectionEmpty() {
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