import { createOrder } from "@/api/order-api";
import { CheckoutInfoData } from "@/dtos/chekout-info-data";
import { Navigation } from "@/routes/navigation";
import { useSteps, Steps, ButtonGroup, Button, Box, Field, Input, VStack, HStack, RadioGroup } from "@chakra-ui/react"
import { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export function CheckoutSteps() {
    const steps = useSteps({
        defaultStep: 0,
        count: checkoutSteps.length,
    })

    const checkoutForm = useForm<CheckoutInfoData>();

    return (
        <FormProvider {...checkoutForm}>
            <Box
                width="100%"
                maxWidth="1440px"
                backdropFilter="blur(20px) saturate(180%)"
                bgColor="whiteAlpha.800"
                padding="20px"
                borderRadius="20px"
            >
                <Steps.RootProvider value={steps}>

                    <Steps.List>
                        {checkoutSteps.map((step, index) => (
                            <Steps.Item key={index} index={index} title={step.title}>
                                <Steps.Indicator />
                                {/*<Box>
                                    <Steps.Title>{step.title}</Steps.Title>
                                    <Steps.Description>{step.description}</Steps.Description>
                                </Box>*/}
                                <Steps.Title>{step.title}</Steps.Title>
                                <Steps.Separator />
                            </Steps.Item>
                        ))}
                    </Steps.List>

                    {checkoutSteps.map((step, index) => (
                        <Steps.Content key={index} index={index}>
                            {step.page}
                        </Steps.Content>
                    ))}

                    <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

                    <ButtonGroup size="sm">
                        <Steps.PrevTrigger asChild>
                            <Button rounded="full" variant="outline">Back</Button>
                        </Steps.PrevTrigger>
                        <Steps.NextTrigger asChild>
                            <Button rounded="full">Next</Button>
                        </Steps.NextTrigger>
                    </ButtonGroup>

                </Steps.RootProvider>
            </Box>
        </FormProvider>
    )
}

const checkoutSteps = [
    {
        title: "Customer information & shipping",
        description: "Step 1 description",
        page: <CustomerInfoAndShipping />,
    },
    {
        title: "Payment method",
        description: "Step 3 description",
        page: <PaymentMethod />,
    },
    {
        title: "Confirmation and payment",
        description: "Step 4 description",
        page: <ConfirmationAndPayment />,
    },
]

//function CustomerInfoAndShipping({ steps }: UseStepsReturn) {
function CustomerInfoAndShipping() {
    const { register: doCheckout } = useFormContext();

    return (
        <Box>
            <VStack gap={4} p={6} mx="auto" mt={10} maxWidth="700px">

                <HStack width="100%">
                    <Field.Root required>
                        <Field.Label>
                            First name <Field.RequiredIndicator />
                        </Field.Label>
                        <Input {...doCheckout("firstName")} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            Last name <Field.RequiredIndicator />
                        </Field.Label>
                        <Input {...doCheckout("lastName")} />
                    </Field.Root>
                </HStack>

                <Field.Root required>
                    <Field.Label>
                        Phone number <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...doCheckout("phoneNumber")} />
                </Field.Root>

                <HStack width="100%">
                    <Field.Root required width="30%">
                        <Field.Label>
                            Post code <Field.RequiredIndicator />
                        </Field.Label>
                        <Input {...doCheckout("postCode")} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            City name <Field.RequiredIndicator />
                        </Field.Label>
                        <Input {...doCheckout("cityName")} />
                    </Field.Root>
                </HStack>

                <HStack width="100%">
                    <Field.Root required>
                        <Field.Label>
                            Street name <Field.RequiredIndicator />
                        </Field.Label>
                        <Input {...doCheckout("streetName")} />
                    </Field.Root>

                    <Field.Root required width="30%">
                        <Field.Label>
                            House number <Field.RequiredIndicator />
                        </Field.Label>
                        <Input {...doCheckout("houseNumber")} />
                    </Field.Root>
                </HStack>

            </VStack>
        </Box>
    );
}

const paymentMethods = [
    { label: "Cash on delivery", value: "1" },
    { label: "Credit or debit card", value: "2" },
]

function PaymentMethod() {
    const { setValue } = useFormContext();
    const [paymentMethod, setPaymentMethod] = useState("1");
    setValue("paymentMethod", paymentMethod);

    return (
        <Box>
            <VStack gap={4} p={6} mx="auto" mt={10} maxWidth="700px" alignItems="flex-start">

                <RadioGroup.Root defaultValue="1" value={paymentMethod}>
                    <VStack gap="6" alignItems="flex-start">
                        {paymentMethods.map((item) => (
                            <RadioGroup.Item key={item.value} value={item.value}
                                onChange={() => {
                                    setPaymentMethod(item.value);
                                    setValue("paymentMethod", item.value);
                                }}
                            >
                                <RadioGroup.ItemHiddenInput />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                            </RadioGroup.Item>
                        ))}
                    </VStack>
                </RadioGroup.Root>


            </VStack>
        </Box>
    );
}

function ConfirmationAndPayment() {
    const { handleSubmit } = useFormContext<CheckoutInfoData>();
    const navigate = useNavigate();
    const onSubmit = async (data: CheckoutInfoData) => {
        createOrder(data);
        navigate(Navigation.home);
    };

    return (
        <Box>
            <VStack>
                <Button rounded="full" onClick={handleSubmit(onSubmit)}>
                    Confirm order
                </Button>
            </VStack>
        </Box>
    );
}