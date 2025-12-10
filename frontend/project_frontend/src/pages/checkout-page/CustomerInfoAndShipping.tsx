import { Box, HStack, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { FieldInput } from "@/components/input/FieldInput";
import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";
import { getFieldKeys } from "@/utils/getFieldKeys";

const checkoutKeys = getFieldKeys(CreateOrderRequestDto);

export function CustomerInfoAndShipping() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateOrderRequestDto>();

  return (
    <Box>
      <VStack gap={4} p={6} mx="auto" mt={10} maxWidth="700px">
        <HStack width="100%">
          <FieldInput
            required
            label="First name"
            error={errors.firstName}
            {...register(checkoutKeys.firstName)}
            size="lg"
          />
          <FieldInput
            required
            label="Last name"
            error={errors.lastName}
            {...register(checkoutKeys.lastName)}
            size="lg"
          />
        </HStack>

        <FieldInput
          required
          label="Phone number"
          error={errors.phoneNumber}
          {...register(checkoutKeys.phoneNumber)}
          size="lg"
        />

        <HStack width="100%">
          <FieldInput
            required
            label="Post code"
            error={errors.postCode}
            {...register(checkoutKeys.postCode)}
            size="lg"
          />
          <FieldInput
            required
            label="City name"
            error={errors.cityName}
            {...register(checkoutKeys.cityName)}
            size="lg"
          />
        </HStack>

        <HStack width="100%">
          <FieldInput
            required
            label="Street name"
            error={errors.streetName}
            {...register(checkoutKeys.streetName)}
            size="lg"
          />
          <FieldInput
            required
            label="House number"
            error={errors.houseNumber}
            {...register(checkoutKeys.houseNumber)}
            size="lg"
          />
        </HStack>
      </VStack>
    </Box>
  );
}
