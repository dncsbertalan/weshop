import { EmptyState, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { BiError } from "react-icons/bi";

import { GradientText } from "@/components/GradientText";
import { PageContainer } from "@/components/PageContainer";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { getUserName } from "@/features/users/utils/getUserName";

import { OrdersSection } from "./OrdersSection";

export function ProfileMain() {
  const { user } = useAuthentication();

  return (
    <PageContainer>
      <Flex justifyContent="center" width="100%" minHeight="calc(100vh - var(--chakra-sizes-global-navbar-height))">
        {!user ? (
          <EmptyState.Root size="lg">
            <EmptyState.Content>
              <EmptyState.Indicator>
                <BiError />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>Something went wrong</EmptyState.Title>
                <EmptyState.Description>Contact customer service</EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        ) : (
          <Stack alignItems="center" gap={10} paddingY={5} flex={1}>
            <Stack direction="row" alignItems="center">
              <Text fontSize="2xl">Hello, </Text>{" "}
              <Text fontSize="2xl">
                <GradientText text={getUserName(user)} />
              </Text>
              <Text fontSize="2xl">! </Text>
            </Stack>

            <OrdersSection />
          </Stack>
        )}
      </Flex>
    </PageContainer>
  );
}
