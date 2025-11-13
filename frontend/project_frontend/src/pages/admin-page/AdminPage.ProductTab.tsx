import { ButtonGroup, IconButton, Pagination, Stack, Table, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { CreatePorductDialog } from "@/features/product-editor/components/CreatePorductDialog";
import { ModifyProductDialog } from "@/features/product-editor/components/ModifyProductDialog";
import { ProductDeleteButton } from "@/features/products/components/ProductDeleteButton";
import { useGetProducts } from "@/features/products/hooks/useGetProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { ProductFilterAction } from "@/features/products/productFilterReducer";
import { formatCurrencyFt } from "@/utils/currency";

import { AdminPageProductFilters } from "./AdminPage.ProductFilters";

export function AdminPageProductTab() {
  const { productFilters, dispatchProductFilters } = useProductFilters();
  const { data: products } = useGetProducts({
    productFilter: { ...productFilters },
  });

  return (
    <Stack gap={8} width="full" alignItems="center" marginBottom={5}>
      <Stack width="full" direction="row" alignItems="end" gap={8}>
        <AdminPageProductFilters />
        <CreatePorductDialog />
      </Stack>

      <Table.ScrollArea width="100%" borderWidth="1px" rounded="md" height={600}>
        <Table.Root size="sm" variant="line" interactive stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Id</Table.ColumnHeader>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
              <Table.ColumnHeader width={100} />
              <Table.ColumnHeader width={75} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products?.items.map((product) => (
              <Table.Row key={product.id} bgColor={product.isDeleted ? "red.100" : undefined}>
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.categories.map(({ name }) => name).join(", ")}</Table.Cell>
                <Table.Cell textAlign="end">{formatCurrencyFt(product.price)}</Table.Cell>
                <Table.Cell textAlign="end">
                  <ModifyProductDialog productId={product.id} />
                </Table.Cell>
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
        pageSize={productFilters.pageSize}
        page={products?.currentsPages}
        onPageChange={(details) => {
          dispatchProductFilters({ type: ProductFilterAction.SetPage, payload: details.page });
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
  );
}
