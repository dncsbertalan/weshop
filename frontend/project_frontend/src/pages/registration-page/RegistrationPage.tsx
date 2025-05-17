import { Button, Field, Flex, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { RegistrationDto } from "@/dtos/RegistrationDto";
import { useForm } from "react-hook-form";
import { authRegister } from "@/api/auth-api";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { Footer } from "../page-components/footer/Footer";
import { PasswordInput } from "@/components/ui/password-input";

export function RegistrationPage() {
    const { register, handleSubmit } = useForm<RegistrationDto>();

    return (
        <Flex
            backgroundColor="bg-color"
            height="100vh"
            flexDirection="column"
        >
            <GlobalNavBar />

            <Flex minHeight="100vh" alignItems="center">
                <VStack gap={4} padding="34px" borderRadius="34px" backgroundColor="white"
                    shadow="rgba(120, 120, 128, 0.16) 0px 11px 34px 0px"
                    maxW="420px" mx="auto" mt={10}
                >
                    <Heading size="lg">Registration</Heading>

                    <HStack>
                        <Field.Root required>
                            <Field.Label>
                                First name <Field.RequiredIndicator />
                            </Field.Label>
                            <Input {...register("firstName")} placeholder="First name" />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                Last name <Field.RequiredIndicator />
                            </Field.Label>
                            <Input {...register("lastName")} placeholder="Last name" />
                        </Field.Root>

                    </HStack>

                    <Field.Root required>
                        <Field.Label>
                            E-mail<Field.RequiredIndicator />
                        </Field.Label>
                        <Input type="email" {...register("email")} placeholder="pelda@email.com" />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            Date of birth <Field.RequiredIndicator />
                        </Field.Label>
                        <Input type="date" {...register("dob")} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            Password <Field.RequiredIndicator />
                        </Field.Label>
                        <PasswordInput {...register("password")} />
                    </Field.Root>

                    <Button width="full" onClick={handleSubmit(authRegister)}>
                        Register
                    </Button>
                </VStack>
            </Flex>

            <Footer />
        </Flex >
    );
}