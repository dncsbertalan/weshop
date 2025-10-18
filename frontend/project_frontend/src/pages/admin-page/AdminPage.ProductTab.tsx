import { useGetProducts } from "@/features/products/hooks/useGetProducts";
import { formatCurrencyFt } from "@/utils/currency";
import { ButtonGroup, IconButton, Pagination, Stack, Table, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { AdminPageProductEditor } from "./AdminPage.ProductEditor";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { AdminPageProductFilters } from "./AdminPage.ProductFilters";
import { ProductDeleteButton } from "@/features/products/components/ProductDeleteButton";

export function AdminPageProductTab() {
  const { filters, setFilters } = useProductFilters();
  const { data: products } = useGetProducts({
    productFilter: { ...filters },
  });

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  return (
    <Stack direction="row" gap={5} marginBottom={5}>
      <Stack flex={1} width="full" alignItems="center" gap={5}>
        <AdminPageProductFilters />

        <Table.ScrollArea width="100%" borderWidth="1px" rounded="md" height={600}>
          <Table.Root size="sm" variant="line" interactive stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Id</Table.ColumnHeader>
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
                <Table.ColumnHeader />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {products?.items.map((product) => (
                <Table.Row
                  key={product.id}
                  onClick={() => {
                    if (selectedProductId === product.id) {
                      setSelectedProductId(null);
                      return;
                    }
                    setSelectedProductId(product.id);
                  }}
                  bgColor={selectedProductId === product.id ? "gray.200" : product.isDeleted ? "red.100" : undefined}
                >
                  <Table.Cell>{product.id}</Table.Cell>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.categories.map(({ name }) => name).join(", ")}</Table.Cell>
                  <Table.Cell textAlign="end">{formatCurrencyFt(product.price)}</Table.Cell>
                  <Table.Cell textAlign="end">
                    {!product.isDeleted ? (
                      <ProductDeleteButton productId={product.id} />
                    ) : (
                      <Text color="red">Deleted</Text>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>

        <Pagination.Root
          count={products?.totalItems}
          pageSize={filters.pageSize}
          page={products?.currentsPages}
          onPageChange={(details) => {
            setFilters({ ...filters, page: details.page });
          }}
        >
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => <IconButton variant={{ base: "ghost", _selected: "outline" }}>{page.value}</IconButton>}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Stack>
      <AdminPageProductEditor productId={selectedProductId} />
    </Stack>
  );
}
