import { Button, Field, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavigationBar } from "../navigation-bar/NavigationBar";
import { LoginDto } from "@/dtos/LoginDto";
import { Link, useNavigate } from "react-router";
import { Navigation } from "@/models/Navigation";
import { useAuth } from "@/context/authContext";
import { authLogin } from "@/api/auth-api";

export function LoginPage() {
    const { register, handleSubmit } = useForm<LoginDto>();
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data: LoginDto) => {
        authLogin(data);
        login(token!);
        navigate(Navigation.home);
    }

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

            <VStack gap={4} p={6} boxShadow="lg" borderRadius="lg" bg="white" minWidth={300} maxW="400px" mx="auto" mt={10}
                shadow="3px 3px 10px rgba(0,0,0,0.2)"
            >
                <Heading size="lg">Login</Heading>

                <Field.Root required>
                    <Field.Label>
                        E-mail<Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="email" {...register("email")} placeholder="example@email.com" />
                </Field.Root>

                <Field.Root required>
                    <Field.Label>
                        Password <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="password" {...register("password")} placeholder="********" />
                </Field.Root>

                <Button colorScheme="blue" w="full" onClick={handleSubmit(onSubmit)}>
                    Login
                </Button>
                <Text>
                    Doesn't have an account yet?
                </Text>
                <Link to={Navigation.registration}>
                    <Text>
                        Create one
                    </Text>
                </Link>
            </VStack>
        </Flex >
    );
};
