import { Center } from "@chakra-ui/react";

import { PageContainer } from "@/components/PageContainer";

import { CheckoutSteps } from "./CheckoutSteps";

export function CheckoutPage() {
  return (
    <PageContainer>
      <Center backgroundColor="bg-color" padding="20px">
        {/*createOrderIsPending &&
                    <Flex>
                    LOADING
                    </Flex>
                    */}
        {/*createOrderIsSuccess &&
                    <Flex width="100%" height="500px" backgroundColor="red">
                    SUCCESS
                    </Flex>
                    */}
        <CheckoutSteps />
      </Center>
    </PageContainer>
  );
}
