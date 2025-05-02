import { useOrders } from "@/context/OrdersContext";
import { OrderItem, Orders } from "@/models/orders";
import { formatCurrency } from "@/utils/currency";
import { Accordion, Box, Flex, Image, Span, Text, VStack } from "@chakra-ui/react";

export function OrdersSection() {
    const { orders, ordersIsPending, ordersIsError } = useOrders();

    if (ordersIsPending) {
        return (
            <Box>
                LOADING
            </Box>
        );
    }

    if (ordersIsError) {
        return (
            <Box>
                ERROR
            </Box>
        );
    }

    return (
        <Box>
            <OrderSec orders={orders} />
        </Box>
    );
}

function OrderSec({ orders }: { orders: Orders }) {
    return (
        <VStack alignItems="flex-start">
            {orders.orders.length > 0 && <Text fontSize="16px" fontWeight="bold">Your previous orders</Text>}
            <Accordion.Root width="780px" collapsible>
                {orders.orders.map((item, index) => (
                    <Accordion.Item key={index} value={index.toString()}>
                        <Accordion.ItemTrigger>
                            <Span flex="1">{new Date(item.createdAt).toDateString()}</Span>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                <Flex justifyContent="space-between">
                                    <Text fontSize="16px" lineHeight="24px" fontWeight="bold">Total</Text>
                                    <Text fontSize="16px" lineHeight="24px" fontWeight="bold">
                                        {formatCurrency(item.items.reduce((acc, item) => acc + item.price, 0))} Ft
                                    </Text>
                                </Flex>
                                {item.items.map((orderItem, index) => (
                                    <OrderList orderItem={orderItem} key={index} />
                                ))}
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </VStack>
    );
}

function OrderList({ orderItem }: { orderItem: OrderItem }) {
    return (
        <Box
            width="780px"
            height="135px"
            borderBottom="solid 1px rgb(220, 220, 220)"
            paddingY="32px"
            paddingX="5px"
        //backgroundColor="whiteAlpha.800"
        //backdropFilter="blur(20px) saturate(180%)"
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
            >
                <Image
                    objectFit="cover"
                    maxHeight="70px"
                    src='https://thewholeserving.com/wp-content/uploads/2014/06/Citrus-Cactus-Juice5.jpg'
                />

                <Flex alignItems="center" justifyContent="space-between" width="690px">

                    <Text fontSize="sm" fontWeight="400px" width="275px">{orderItem.productName}</Text>

                    <Flex width="120px" justifyContent="">
                        <Text flexBasis="20%">x</Text>
                        <Text>{orderItem.quantity}</Text>
                    </Flex>

                    <Box width="120px" textAlign="right">
                        <Text fontSize="md" fontWeight="bold">
                            {formatCurrency(orderItem.price)} Ft
                        </Text>
                    </Box>

                </Flex>

            </Flex>
        </Box>
    );
}