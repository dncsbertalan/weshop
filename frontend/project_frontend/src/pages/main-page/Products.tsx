import { ButtonGroup, For, IconButton, Pagination, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { ProductCard } from "@/components/product/ProductCard";
import { PagedProduct } from "@/dtos/response/product/PagedProduct";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { ProductFilterAction } from "@/features/products/ProductFilterReducer";
import { scrollToTopSmooth } from "@/utils/scroll";

interface ProductSectionProps {
  products: PagedProduct;
}

export function Products({ products }: ProductSectionProps) {
  const { productFilters, dispatchProductFilters } = useProductFilters();
  useEffect(() => {
    scrollToTopSmooth();
  }, [productFilters.page]);

  return (
    <React.Fragment>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={8} width="100%">
        <For each={products.items}>{(item, index) => <ProductCard product={item} key={index} />}</For>
      </SimpleGrid>

      <Pagination.Root
        count={products.totalItems}
        pageSize={productFilters.pageSize}
        defaultPage={1}
        page={productFilters.page}
        onPageChange={(details) => {
          dispatchProductFilters({ type: ProductFilterAction.SetPage, payload: details.page });
        }}
        css={{
          marginTop: 10,
          backgroundColor: "whiteAlpha.800",
          padding: 2,
          rounded: "full",
          shadow: "md",
        }}
      >
        <ButtonGroup variant="ghost" size="sm" rounded="full">
          <Pagination.PrevTrigger asChild>
            <IconButton rounded="full">
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton rounded="full" variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton rounded="full">
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </React.Fragment>
  );
}
