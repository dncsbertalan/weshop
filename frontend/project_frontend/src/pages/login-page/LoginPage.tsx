import { Button, Field, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LoginDto } from "@/dtos/LoginDto";
import { Link, useNavigate } from "react-router";
import { Navigation } from "@/routes/navigation";
import { useAuth } from "@/context/AuthContext";
import { authLogin } from "@/api/auth-api";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { Footer } from "../page-components/footer/Footer";
import { PasswordInput } from "@/components/ui/password-input";

export function LoginPage() {
    const { register, handleSubmit } = useForm<LoginDto>();
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data: LoginDto) => {
        authLogin(data);
        login(token!);
        navigate(Navigation.home);
    };

    return (
        <Flex
            background="bg-color"
            height="100vh"
            flexDirection="column"
        >
            <GlobalNavBar />

            <Flex minHeight="100vh" alignItems="center">
                <VStack gap={4} padding="34px" borderRadius="34px" backgroundColor="white"
                    minWidth={320} maxW="400px" mx="auto"
                    //shadow="3px 3px 10px rgba(0,0,0,0.2)"
                    shadow="rgba(120, 120, 128, 0.16) 0px 11px 34px 0px"
                    height="fit-content"
                >
                    <Heading size="2xl" marginBottom="20px">Login</Heading>

                    <Field.Root required>
                        <Field.Label>
                            E-mail
                        </Field.Label>
                        <Input type="email" {...register("email")} placeholder="example@email.com" /> {/* ide 12 px padding */}
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            Password
                        </Field.Label>
                        <PasswordInput {...register("password")} />
                    </Field.Root>

                    <Button width="full" onClick={handleSubmit(onSubmit)}>
                        Login
                    </Button>
                    <Flex flexDirection="column" alignItems="center" width="100%" marginTop="10px">
                        <Text fontSize="14px">
                            Doesn't have an account yet?
                        </Text>
                        <Link to={Navigation.registration}>
                            <Text fontSize="16px" _hover={{textDecoration: "underline"}}>
                                Create one
                            </Text>
                        </Link>
                    </Flex>
                </VStack>
            </Flex>

            <Footer />
        </Flex >
    );
};
