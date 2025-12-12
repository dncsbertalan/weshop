import { Button, ButtonGroup, Center, Stack, Steps, useSteps } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";

import { ConfirmationAndPayment } from "./ConfirmationAndPayment";
import { CustomerInfoAndShipping } from "./CustomerInfoAndShipping";
import { PaymentMethod } from "./PaymentMethod";

export function CheckoutSteps() {
  const steps = useSteps({
    defaultStep: 0,
    count: checkoutSteps.length,
  });

  const checkoutForm = useForm<CreateOrderRequestDto>({
    resolver: zodResolver(CreateOrderRequestDto),
    defaultValues: {
      paymentMethod: "cash",
    },
  });

  return (
    <FormProvider {...checkoutForm}>
      <Stack width="full">
        <Steps.RootProvider value={steps}>
          <Steps.List>
            {checkoutSteps.map((step, index) => (
              <Steps.Item key={step.title} index={index} title={step.title}>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>

          {checkoutSteps.map((step, index) => (
            <Steps.Content key={step.title} index={index}>
              {step.page}
            </Steps.Content>
          ))}

          <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

          <Center>
            <ButtonGroup>
              <Steps.PrevTrigger asChild>
                <Button rounded="full" variant="outline">
                  Back
                </Button>
              </Steps.PrevTrigger>
              {steps.value !== 2 && (
                <Steps.NextTrigger asChild>
                  <Button rounded="full">Next</Button>
                </Steps.NextTrigger>
              )}
            </ButtonGroup>
          </Center>
        </Steps.RootProvider>
      </Stack>
    </FormProvider>
  );
}

const checkoutSteps = [
  {
    title: "Customer information & shipping",
    page: <CustomerInfoAndShipping />,
  },
  {
    title: "Payment method",
    page: <PaymentMethod />,
  },
  {
    title: "Confirmation and payment",
    page: <ConfirmationAndPayment />,
  },
];
