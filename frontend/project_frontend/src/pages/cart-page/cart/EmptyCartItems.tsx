import { Navigation } from "@/routes/navigation";
import { EmptyState, VStack, Button } from "@chakra-ui/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

export function EmptyCartItems() {
  return (
    <EmptyState.Root size="lg">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <MdOutlineShoppingCart />
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
