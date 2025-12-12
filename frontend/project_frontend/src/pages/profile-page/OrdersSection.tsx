import { Accordion, Box, EmptyState, Flex, Separator, Span, Stack, Text, VStack } from "@chakra-ui/react";
import { BiError } from "react-icons/bi";

import { Container } from "@/components/Container";
import { InformationRow } from "@/components/InformationRow";
import { useGetOrders } from "@/features/order/hooks/useGetOrders";
import { formatCurrencyFt } from "@/utils/currency";

export function OrdersSection() {
  const { data: orders, isPending, isError } = useGetOrders();

  if (isPending) {
    return <Box>LOADING</Box>;
  }

  if (isError) {
    return (
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
    );
  }

  return (
    <Container alignItems="flex-start" width="full" maxW={800} gap={5} padding={6}>
      {orders.orders.length > 0 && (
        <Text fontSize="md" fontWeight="bold">
          Your previous orders
        </Text>
      )}
      <Accordion.Root collapsible unmountOnExit lazyMount>
        <Stack gap={4}>
          {orders.orders.map((order, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Accordion.Item key={index} value={index.toString()}>
              <Accordion.ItemTrigger>
                <Span flex="1">{new Date(order.createdAt).toDateString()}</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Flex justifyContent="space-between">
                    <Text fontSize="md" fontWeight="bold">
                      Total
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                      {formatCurrencyFt(order.items.reduce((acc, item) => acc + item.price, 0))}
                    </Text>
                  </Flex>
                  <Separator />
                  {order.items.map((orderItem, index) => (
                    <InformationRow
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      label={orderItem.productName}
                      value={`${orderItem.quantity} x ${formatCurrencyFt(orderItem.price)}`}
                    />
                  ))}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Stack>
      </Accordion.Root>
    </Container>
  );
}
