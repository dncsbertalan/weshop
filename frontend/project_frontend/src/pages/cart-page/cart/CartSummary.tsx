import { Button, Flex, Heading, Separator, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useNavigate } from "react-router";

import { GlassContainer } from "@/components/GlassContainer";
import { InformationRow } from "@/components/InformationRow";
import { CartDto } from "@/dtos/response/cart/CartDto";
import { Navigation } from "@/routes/navigation";
import { formatCurrency } from "@/utils/currency";

interface CartSummaryProps {
  cart: CartDto;
}

export function CartSummary({ cart }: CartSummaryProps) {
  const navigate = useNavigate();
  const checkout = () => {
    void navigate(Navigation.checkout);
  };

  const total = useMemo(() => {
    return cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart.cartItems]);

  return (
    <GlassContainer shadow="gentle" minWidth={400}>
      {/* width={{ base: "100%", sm: "520px", md: "700px", lg: "285px", xl: "300px" }} */}

      <VStack alignItems="flex-start" width="100%">
        <Heading lineHeight="25px" fontSize="21px" fontWeight="500">
          Cart summary
        </Heading>

        <InformationRow label="Subtotal" value={`${formatCurrency(total)} Ft`} />
        <InformationRow label="VAT" value={`${formatCurrency(Math.ceil(total * 0.27))} Ft`} />
        <InformationRow label="Rounding" value="0 Ft" />
        <InformationRow label="Net total" value={`${formatCurrency(Math.ceil(total * 0.73))} Ft`} />

        <Separator width="100%" />

        <InformationRow label="Gross total" value={`${formatCurrency(total)} Ft`} />

        <Flex width="100%" justifyContent="flex-end">
          <Button rounded="full" marginTop="18px" onClick={checkout}>
            Proceed to checkout
          </Button>
        </Flex>
      </VStack>
    </GlassContainer>
  );
}
