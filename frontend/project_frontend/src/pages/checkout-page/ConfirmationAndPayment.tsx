import { Box, Button, Heading, Separator, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { InformationRow } from "@/components/InformationRow";
import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useGetCart } from "@/features/cart/hooks/useGetCart";
import { useCreateOrder } from "@/features/order/hooks/useCreateOrder";
import { formatCurrencyFt } from "@/utils/currency";

const paymentMethods = [
  { label: "Credit or debit card", value: "card" },
  { label: "Cash on delivery", value: "cash" },
];

export function ConfirmationAndPayment() {
  const { handleSubmit, getValues } = useFormContext<CreateOrderRequestDto>();
  const { data: cart } = useGetCart();
  const { user } = useAuthentication();

  const allFormData = getValues();
  const { mutate, isPending } = useCreateOrder();

  const onSubmit = (data: CreateOrderRequestDto) => {
    if (!user) {
      return;
    }

    mutate({ activeCartId: user.activeCartId, createOrderRequest: data });
  };

  const paymentMethodLabel =
    paymentMethods.find((pm) => pm.value === allFormData.paymentMethod)?.label || allFormData.paymentMethod;

  return (
    <Box p={{ base: 2, md: 6 }}>
      <VStack gap={6} mx="auto" mt={{ base: 4, md: 10 }} maxWidth={700}>
        <Heading size="lg" marginBottom={4}>
          Confirm Your Order
        </Heading>

        <VStack gap={3} alignItems="start" width="full" borderWidth={1} borderRadius="2xl" p={5} shadow="sm">
          <Heading size="md" marginBottom={3}>
            Shipping Information
          </Heading>
          <InformationRow bold label="Name" value={`${allFormData.firstName} ${allFormData.lastName}`} />
          <InformationRow bold label="Phone" value={allFormData.phoneNumber} />
          <InformationRow
            bold
            label="Address"
            value={`${allFormData.postCode} ${allFormData.cityName}, ${allFormData.streetName} ${allFormData.houseNumber}`}
          />
        </VStack>

        <VStack gap={3} alignItems="start" width="full" borderWidth={1} borderRadius="2xl" p={5} shadow="sm">
          <Heading size="md" marginBottom={3}>
            Payment Method
          </Heading>
          <InformationRow bold label="Method" value={paymentMethodLabel} />
        </VStack>

        <VStack gap={3} alignItems="start" width="full" borderWidth={1} borderRadius="2xl" p={5} shadow="sm">
          <Heading size="md" marginBottom={3}>
            Order Summary
          </Heading>
          {cart &&
            cart.cartItems.map((item) => (
              <InformationRow
                key={item.id}
                label={item.name}
                value={`${item.quantity} x ${formatCurrencyFt(item.price)}`}
              />
            ))}
          <Separator />
          {cart && <InformationRow bold label="Total" value={formatCurrencyFt(cart.priceTotal)} />}
        </VStack>

        <Button
          rounded="full"
          colorScheme="blue"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
          loadingText="Processing..."
          size="lg"
          mt={6}
          w="100%"
        >
          Confirm and Place Order
        </Button>
      </VStack>
    </Box>
  );
}
