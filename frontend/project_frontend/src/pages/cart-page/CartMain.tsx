import { Flex } from "@chakra-ui/react";

import { PageContainer } from "@/components/PageContainer";
import { useGetCart } from "@/features/cart/hooks/useGetCart";

import { CartContent } from "./cart/CartContent";
import { CartSummary } from "./cart/CartSummary";

export function CartMain() {
  const { data: cart } = useGetCart();

  return (
    <PageContainer>
      <Flex direction={{ base: "column", md: "row" }} justifyContent="center" flex={1} paddingY={10} gap={10}>
        <Flex flex={{ base: undefined, md: 1.75 }} direction="column" alignItems="center">
          {cart && <CartContent cart={cart} />}
        </Flex>

        <Flex flex={{ base: undefined, md: 1 }} width="full" direction="column" alignItems="center">
          {cart && <CartSummary cart={cart} />}
        </Flex>
      </Flex>
    </PageContainer>
  );
}
