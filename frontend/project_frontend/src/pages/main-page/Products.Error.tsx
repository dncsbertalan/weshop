import { EmptyState, VStack } from "@chakra-ui/react";
import { BiError } from "react-icons/bi";

export function ProductsSectionError() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <BiError />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Something went wrong</EmptyState.Title>
          <EmptyState.Description>We couldn&apos;t load the products. Please try again later.</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
