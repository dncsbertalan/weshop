import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
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

  return (
    <GlassContainer shadow="gentle" width={{ base: "full" }} maxWidth={{ base: undefined, md: 400 }}>
      <VStack alignItems="flex-start" width="100%" gap={8}>
        <Heading fontSize="2xl" fontWeight="medium">
          Cart summary
        </Heading>

        <InformationRow label="Total" value={`${formatCurrency(cart.priceTotal)} Ft`} />

        <Flex width="100%" justifyContent="flex-end">
          <Button size="xl" paddingX={8} width="full" rounded="full" marginTop={0} onClick={checkout}>
            Proceed to checkout
          </Button>
        </Flex>
      </VStack>
    </GlassContainer>
  );
}
