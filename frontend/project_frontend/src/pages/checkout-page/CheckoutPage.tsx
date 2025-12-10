import { Center } from "@chakra-ui/react";

import { PageContainer } from "@/components/PageContainer";

import { CheckoutSteps } from "./CheckoutSteps";

export function CheckoutPage() {
  return (
    <PageContainer>
      <Center padding="20px">
        <CheckoutSteps />
      </Center>
    </PageContainer>
  );
}
