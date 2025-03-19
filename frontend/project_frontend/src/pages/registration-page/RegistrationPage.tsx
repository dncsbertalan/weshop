import { Button, Field, Flex, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { NavigationBar } from "../navigation-bar/NavigationBar";
import { RegistrationDto } from "@/dtos/RegistrationDto";
import { useForm } from "react-hook-form";
import { authRegister } from "@/api/authApi";

export function RegistrationPage() {
    const { register, handleSubmit } = useForm<RegistrationDto>();

    return (
        <Flex
            background="gray"
            width="100vw"
            height="100vh"
            padding={10}
            justifyContent="center"
            alignItems="center"
        >
            <NavigationBar />

            <VStack gap={4} p={6} boxShadow="lg" borderRadius="lg" bg="white" maxW="400px" mx="auto" mt={10}>
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
                    <Input type="password" {...register("password")} placeholder="********" />
                </Field.Root>

                <Button colorScheme="blue" w="full" onClick={handleSubmit(authRegister)}>
                    Register
                </Button>
            </VStack>
        </Flex >
    );
}