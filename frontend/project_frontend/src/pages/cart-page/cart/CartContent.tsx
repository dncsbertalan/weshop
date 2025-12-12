import { Box } from "@chakra-ui/react";

import { Container } from "@/components/Container";
import { CartDto } from "@/dtos/response/cart/CartDto";

import { CartContentHeader } from "./CartContent.Header";
import { CartItems } from "./CartItems";

interface CartContentProps {
  cart: CartDto;
}

export function CartContent({ cart }: CartContentProps) {
  return (
    <Container gap={0} width="100%" maxHeight={700} overflow="auto" padding={0}>
      <CartContentHeader cart={cart} />
      <Box padding={4}>
        <CartItems cartItems={cart.cartItems} />
      </Box>
    </Container>
  );
}
