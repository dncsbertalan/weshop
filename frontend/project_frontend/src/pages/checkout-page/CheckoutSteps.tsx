import { Box, Button, ButtonGroup, Center, Field, Heading, HStack, Input, RadioGroup, Separator, Stack,Steps, Text, useSteps, VStack } from "@chakra-ui/react"
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

import { useCart } from "@/context/CartContext";
import { CheckoutInfoData } from "@/dtos/chekout-info-data";
import { Navigation } from "@/routes/navigation";
import { sleep } from "@/utils/sleep";

export function CheckoutSteps() {
    const steps = useSteps({
        defaultStep: 0,
        count: checkoutSteps.length,
    })

    const checkoutForm = useForm<CheckoutInfoData>({
        defaultValues: {
            paymentMethod: "2",
        }
    });

    return (
        <FormProvider {...checkoutForm}>
            <Box
                width="100%"
                maxWidth="1440px"
                backdropFilter="blur(20px) saturate(180%)"
                bgColor="whiteAlpha.800"
                padding="20px"
                borderRadius="20px"
                shadow="0px 10px 20px rgba(0, 0, 0, 0.09), 0px 0px 1px rgba(0, 0, 0, 0.2)"
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

                    <Center>
                        <ButtonGroup >
                            <Steps.PrevTrigger asChild>
                                <Button rounded="full" variant="outline">Back</Button>
                            </Steps.PrevTrigger>
                            {steps.value !== 2 &&
                                <Steps.NextTrigger asChild>
                                    <Button rounded="full">Next</Button>
                                </Steps.NextTrigger>
                            }
                        </ButtonGroup>
                    </Center>

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
    { label: "Credit or debit card", value: "1" },
    { label: "Cash on delivery", value: "2" },
]

function PaymentMethod() {
    const { setValue, register, watch, formState: { errors } } = useFormContext<CheckoutInfoData>();
    const selectedPaymentMethod = watch("paymentMethod");

    const handlePaymentMethodChange = (newValue: string) => {
        setValue("paymentMethod", newValue, { shouldValidate: true, shouldDirty: true });
        if (newValue !== "card") {
            setValue("cardNumber", undefined);
            setValue("expiryDate", undefined);
            setValue("cvc", undefined);
        }
    };

    return (
        <Box p={{ base: 2, md: 6 }}>
            <VStack gap={8} mx="auto" mt={{ base: 4, md: 10 }} maxWidth="700px" alignItems="flex-start">
                <Heading size="md" mb={0}>Select Payment Method</Heading>
                <RadioGroup.Root
                    value={selectedPaymentMethod || "2"}
                    name="paymentMethod"
                >
                    <Stack direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 6 }}>
                        {paymentMethods.map((item) => (
                            <RadioGroup.Item
                                key={item.value}
                                value={item.value}
                                //onClick={() => handlePaymentMethodChange(item.value)}
                                onChange={() => handlePaymentMethodChange(item.value)}
                            //style={{border: '1px solid lightgray', padding: '10px', borderRadius: '5px', cursor: 'pointer'}}
                            >
                                <RadioGroup.ItemHiddenInput />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText fontWeight="medium" ml={2}>{item.label}</RadioGroup.ItemText>
                            </RadioGroup.Item>
                        ))}
                    </Stack>
                </RadioGroup.Root>

                {selectedPaymentMethod === "1" && (
                    <VStack gap={4} w="100%" mt={6} borderWidth="1px" borderRadius="md" p={5} shadow="sm">
                        <Heading size="sm" alignSelf="flex-start">Enter Card Details</Heading>

                        <Field.Root
                            required={selectedPaymentMethod === "1"}

                            invalid={!!errors.cardNumber}
                        >
                            <Field.Label>
                                Card Number <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                {...register("cardNumber", {
                                    required: selectedPaymentMethod === "1" ? "Card number is required" : false,
                                    pattern: { value: /^[0-9]{13,19}$/, message: "Invalid card number" } // Egyszerű validáció
                                })}
                                placeholder="0000 0000 0000 0000"
                            />
                            {errors.cardNumber && <Field.HelperText color="red.500">{errors.cardNumber.message}</Field.HelperText>}
                        </Field.Root>

                        <HStack gap={4} w="100%" alignItems="flex-start">
                            <Field.Root
                                required={selectedPaymentMethod === "1"}

                                invalid={!!errors.expiryDate}
                                width="100%"
                            >
                                <Field.Label>
                                    Expiry Date (MM/YY) <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                    {...register("expiryDate", {
                                        required: selectedPaymentMethod === "1" ? "Expiry date is required" : false,
                                        pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "Invalid format (MM/YY)" }
                                    })}
                                    placeholder="MM/YY"
                                />
                                {errors.expiryDate && <Field.HelperText color="red.500">{errors.expiryDate.message}</Field.HelperText>}
                            </Field.Root>

                            <Field.Root
                                required={selectedPaymentMethod === "1"}

                                invalid={!!errors.cvc}
                                width="100%"
                            >
                                <Field.Label>
                                    CVC <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                    {...register("cvc", {
                                        required: selectedPaymentMethod === "1" ? "CVC is required" : false,
                                        pattern: { value: /^[0-9]{3,4}$/, message: "Invalid CVC" }
                                    })}
                                    placeholder="123"
                                />
                                {errors.cvc && <Field.HelperText color="red.500">{errors.cvc.message}</Field.HelperText>}
                            </Field.Root>
                        </HStack>
                        <Text fontSize="xs" color="gray.500" mt={2}>
                            Your payment information is processed securely. We do not store your full card details.
                        </Text>
                    </VStack>
                )}
            </VStack>
        </Box>
    );
}

function ConfirmationAndPayment() {
    const { handleSubmit, getValues } = useFormContext<CheckoutInfoData>();
    const allFormData = getValues();
    const navigate = useNavigate();
    const { createOrder } = useCart();
    const onSubmit = async (data: CheckoutInfoData) => {
        await createOrder(data)
            .then(async () => {
                await sleep(1000 * 2);
                navigate(Navigation.home);
            });
    };

    const { cart } = useCart();

    const paymentMethodLabel = paymentMethods.find(pm => pm.value === allFormData.paymentMethod)?.label || allFormData.paymentMethod;


    return (
        <Box p={{ base: 2, md: 6 }}>
            <VStack gap={6} mx="auto" mt={{ base: 4, md: 10 }} maxWidth="700px">
                <Heading size="lg" mb={4}>Confirm Your Order</Heading>

                <VStack gap={3} align="stretch" w="100%" borderWidth="1px" borderRadius="md" p={5} shadow="sm">
                    <Heading size="md" mb={3}>Shipping Information</Heading>
                    <HStack justifyContent="space-between">
                        <Text fontWeight="bold">Name:</Text>
                        <Text>{allFormData.firstName} {allFormData.lastName}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text fontWeight="bold">Phone:</Text>
                        <Text>{allFormData.phoneNumber}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text fontWeight="bold">Address:</Text>
                        <Text>{allFormData.postCode} {allFormData.cityName}, {allFormData.streetName} {allFormData.houseNumber}</Text>
                    </HStack>
                </VStack>

                <VStack gap={3} align="stretch" w="100%" borderWidth="1px" borderRadius="md" p={5} shadow="sm">
                    <Heading size="md" mb={3}>Payment Method</Heading>
                    <HStack justifyContent="space-between">
                        <Text fontWeight="bold">Method:</Text>
                        <Text>{paymentMethodLabel}</Text>
                    </HStack>
                </VStack>

                <VStack gap={3} align="stretch" w="100%" borderWidth="1px" borderRadius="md" p={5} shadow="sm">
                    <Heading size="md" mb={3}>Order Summary</Heading>
                    {cart && cart.cartItems.map(item => (
                        <Text key={item.id}>{item.name} - {item.quantity} x {item.price}</Text>
                    ))}
                    <Separator />
                    <Text fontWeight="bold">Total: {cart && cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Text>
                </VStack>


                <Button
                    rounded="full"
                    colorScheme="blue"
                    onClick={handleSubmit(onSubmit)}
                    //isLoading={isSubmitting}
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