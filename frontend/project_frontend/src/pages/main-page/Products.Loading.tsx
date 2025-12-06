import { For, SimpleGrid } from "@chakra-ui/react";

import { SkeletonProductCard } from "@/components/product/SkeletonProductCard";

export function ProductSectionLoading() {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={8} width="100%">
      <For each={[1, 2, 3, 4, 5]}>{(id) => <SkeletonProductCard key={id} />}</For>
    </SimpleGrid>
  );
}
