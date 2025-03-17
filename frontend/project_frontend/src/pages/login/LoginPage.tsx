import { Button, Field, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavigationBar } from "../NavigationBar";
import { LoginDto } from "@/dtos/LoginDto";
import { authLogin } from "@/api/authApi";

export function LoginPage() {
    const { register, handleSubmit } = useForm<LoginDto>();

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

            <VStack gap={4} p={6} boxShadow="lg" borderRadius="lg" bg="white" minWidth={300} maxW="400px" mx="auto" mt={10}>
                <Heading size="lg">Login</Heading>

                <Field.Root required>
                    <Field.Label>
                        E-mail<Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="email" {...register("email")} placeholder="pelda@email.com" />
                </Field.Root>

                <Field.Root required>
                    <Field.Label>
                        Password <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="password" {...register("password")} placeholder="********" />
                </Field.Root>

                <Button colorScheme="blue" w="full" onClick={handleSubmit(authLogin)}>
                    Login
                </Button>
            </VStack>
        </Flex >
    );
};
