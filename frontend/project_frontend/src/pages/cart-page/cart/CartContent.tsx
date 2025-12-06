import { Box, Spinner, Stack, VStack } from "@chakra-ui/react";

import { Container } from "@/components/Container";
import { CartDto } from "@/dtos/response/cart/CartDto";

import { CartContentHeader } from "./CartContent.Header";
import { CartItems } from "./CartItems";

interface CartContentProps {
  cart: CartDto;
}

export function CartContent({ cart }: CartContentProps) {
  return (
    <Container gap={0} width="100%" maxHeight={600} overflow="auto" padding={0}>
      <CartContentHeader cart={cart} />
      <Box borderTop="1px solid" borderTopColor="separator-color" padding={4}>
        <CartItems cartItems={cart.cartItems} />
      </Box>
    </Container>
  );
}

function CartItemSectionLoading() {
  return <Spinner size="xl" borderWidth="4px" css={{ "--spinner-track-color": "colors.gray.200" }} />;
}

function CartItemSectionError() {
  return <div>ERROR IN THE CART</div>;
}
