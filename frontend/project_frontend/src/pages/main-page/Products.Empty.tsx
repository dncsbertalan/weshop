import { EmptyState, VStack } from "@chakra-ui/react";
import { LuPackageSearch } from "react-icons/lu";

export function ProductsEmpty() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuPackageSearch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>No items found</EmptyState.Title>
          <EmptyState.Description>Try adjusting your filters or search to discover more items.</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
