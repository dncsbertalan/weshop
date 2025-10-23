import { ProductCard } from "@/components/product/ProductCard";
import { Flex, SimpleGrid, For, Pagination, ButtonGroup, IconButton, EmptyState, VStack } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useEffect } from "react";
import { BiError } from "react-icons/bi";
import { SkeletonProductCard } from "@/components/product/SkeletonProductCard";
import { scrollToTopSmooth } from "@/utils/scroll";
import { useGetProducts } from "@/features/products/hooks/useGetProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";

export function ProductSection() {
  const { productFilters, setProductFilters } = useProductFilters();
  const { data: products, isError, isPending } = useGetProducts({ productFilter: productFilters });

  useEffect(() => {
    scrollToTopSmooth();
  }, [productFilters.page]);

  return (
    <Flex flexDirection="column" alignItems="center" width="100%" height="100%">
      {isError && <ProductsSectionError />}

      {isPending && <ProductSectionLoading />}

      {!isPending && (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="20px" width="100%">
          <For each={products?.items}>{(item, index) => <ProductCard product={item} key={index} />}</For>
        </SimpleGrid>
      )}

      {!isPending && !isError && (
        <Pagination.Root
          count={products?.totalItems}
          pageSize={productFilters.pageSize}
          defaultPage={1}
          page={productFilters.page}
          onPageChange={(details) => {
            setProductFilters({ ...productFilters, page: details.page });
          }}
          marginTop={10}
        >
          <ButtonGroup variant="ghost" size="sm" rounded="full">
            <Pagination.PrevTrigger asChild>
              <IconButton borderLeftRadius="9999px">
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => <IconButton variant={{ base: "ghost", _selected: "outline" }}>{page.value}</IconButton>}
            />

            <Pagination.NextTrigger asChild>
              <IconButton borderRightRadius="9999px">
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      )}
    </Flex>
  );
}

function ProductsSectionError() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <BiError />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Something went wrong</EmptyState.Title>
          <EmptyState.Description>We couldn't load the products. Please try again later.</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}

function ProductSectionLoading() {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="20px" width="100%">
      <For each={[1, 2, 3, 4]}>{(id) => <SkeletonProductCard key={id} />}</For>
    </SimpleGrid>
  );
}
