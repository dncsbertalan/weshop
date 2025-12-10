import { Box, Field, Heading, HStack, Input, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";
import { getFieldKeys } from "@/utils/getFieldKeys";

const checkoutKeys = getFieldKeys(CreateOrderRequestDto);

const paymentMethods = [
  { label: "Credit or debit card", value: "card" },
  { label: "Cash on delivery", value: "cash" },
];

export function PaymentMethod() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateOrderRequestDto>();
  const selectedPaymentMethod = watch(checkoutKeys.paymentMethod);

  return (
    <Box p={{ base: 2, md: 6 }}>
      <VStack gap={8} marginX="auto" marginTop={{ base: 4, md: 10 }} maxWidth={700} alignItems="flex-start">
        <Heading size="md" marginBottom={0}>
          Select Payment Method
        </Heading>

        <Controller
          name={checkoutKeys.paymentMethod}
          control={control}
          render={({ field }) => (
            <RadioGroup.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value);
              }}
            >
              <Stack gap={6}>
                {paymentMethods.map((item) => (
                  <RadioGroup.Item key={item.value} value={item.value}>
                    <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                    <RadioGroup.ItemIndicator />

                    <RadioGroup.ItemText fontWeight="medium" ml={2}>
                      {item.label}
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </Stack>
            </RadioGroup.Root>
          )}
        />

        <RadioGroup.Root value={selectedPaymentMethod} name="paymentMethod">
          <Stack direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 6 }} />
        </RadioGroup.Root>

        {selectedPaymentMethod === "card" && (
          <VStack gap={4} width="full" marginTop={6} borderWidth={1} borderRadius="2xl" p={5} shadow="sm">
            <Heading size="sm" alignSelf="flex-start">
              Enter Card Details
            </Heading>

            <Field.Root invalid={!!errors.cardNumber}>
              <Field.Label>
                Card Number <Field.RequiredIndicator />
              </Field.Label>
              <Input {...register(checkoutKeys.cardNumber)} placeholder="0000 0000 0000 0000" rounded="xl" />
              {errors.cardNumber && <Field.ErrorText>{errors.cardNumber.message}</Field.ErrorText>}
            </Field.Root>

            <HStack gap={4} w="100%" alignItems="flex-start">
              <Field.Root invalid={!!errors.expiryDate} width="100%">
                <Field.Label>
                  Expiry Date (MM/YY) <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register(checkoutKeys.expiryDate)} placeholder="MM/YY" rounded="xl" />
                {errors.expiryDate && <Field.ErrorText>{errors.expiryDate.message}</Field.ErrorText>}
              </Field.Root>

              <Field.Root invalid={!!errors.cvc} width="100%">
                <Field.Label>
                  CVC <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register(checkoutKeys.cvc)} placeholder="123" rounded="xl" />
                {errors.cvc && <Field.ErrorText>{errors.cvc.message}</Field.ErrorText>}
              </Field.Root>
            </HStack>
            <Text fontSize="xs" color="fg.subtle" marginTop={2}>
              Your payment information is processed securely. We do not store your full card details.
            </Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
