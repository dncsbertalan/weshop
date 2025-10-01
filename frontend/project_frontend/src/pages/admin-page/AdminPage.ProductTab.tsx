import { useGetProducts } from "@/features/products/hooks/useGetProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { formatCurrencyFt } from "@/utils/currency";
import {
  ButtonGroup,
  IconButton,
  Pagination,
  Stack,
  Table,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { AdminPageProductEditor } from "./AdminPage.ProductEditor";

export function AdminPageProductTab() {
  const { filters, setFilters } = useProductFilters();
  const { data: products } = useGetProducts({
    productFilter: { ...filters },
  });

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  return (
    <Stack direction="row" gap={5} marginBottom={5}>
      <Stack flex={1} width="full" alignItems="center" gap={5}>
        <Table.ScrollArea
          width="100%"
          borderWidth="1px"
          rounded="md"
          height={500}
        >
          <Table.Root size="sm" variant="line" interactive stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Id</Table.ColumnHeader>
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
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
                  bgColor={
                    selectedProductId === product.id ? "gray.200" : undefined
                  }
                >
                  <Table.Cell>{product.id}</Table.Cell>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>
                    {product.categories.map(({ name }) => name).join(", ")}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {formatCurrencyFt(product.price)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>

        <Pagination.Root
          count={products?.totalItems}
          pageSize={products?.totalPages}
          page={products?.currentsPages}
        >
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <IconButton
                onClick={() =>
                  setFilters({ ...filters, page: filters.page - 1 })
                }
              >
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton
                  variant={{ base: "ghost", _selected: "outline" }}
                  onClick={() => setFilters({ ...filters, page: page.value })}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton
                onClick={() =>
                  setFilters({ ...filters, page: filters.page + 1 })
                }
              >
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
