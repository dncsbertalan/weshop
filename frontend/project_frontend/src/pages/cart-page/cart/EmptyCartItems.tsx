import { Button, EmptyState, VStack } from "@chakra-ui/react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router";

import { Navigation } from "@/routes/navigation";

export function EmptyCartItems() {
  return (
    <EmptyState.Root size="lg">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <MdOutlineRemoveShoppingCart />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Your cart is empty</EmptyState.Title>
          <EmptyState.Description>Explore our products and add items to your cart</EmptyState.Description>
        </VStack>
        <Link to={Navigation.home}>
          <Button rounded="full">See products</Button>
        </Link>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
