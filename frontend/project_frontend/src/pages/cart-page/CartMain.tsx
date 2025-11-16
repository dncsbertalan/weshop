import { Flex } from "@chakra-ui/react";

import { PageContainer } from "@/components/PageContainer";
import { useGetCart } from "@/features/cart/hooks/useGetCart";

import { CartContent } from "./cart/CartContent";
import { CartSummary } from "./cart/CartSummary";

export function CartMain() {
  const { data: cart, isPending, isError } = useGetCart();

  return (
    <PageContainer>
      <Flex paddingY={10} justifyContent="center">
        <Flex
          width="100%"
          maxWidth="global-max-window-size"
          justifyContent={{ mdDown: "center", lg: "space-around" }}
          flexDirection={{ mdDown: "column", lg: "row" }}
        >
          <Flex flexDirection="column" alignItems="center">
            {cart && <CartContent cart={cart} />}
          </Flex>

          <Flex flexDirection="column" gap="30px" alignItems="center">
            {cart && <CartSummary cart={cart} />}
          </Flex>
        </Flex>
      </Flex>
    </PageContainer>
  );
}
