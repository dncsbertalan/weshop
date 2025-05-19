import { Button, Field, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LoginDto } from "@/dtos/LoginDto";
import { Link } from "react-router";
import { Navigation } from "@/routes/navigation";
import { useAuth } from "@/context/AuthContext";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { Footer } from "../page-components/footer/Footer";
import { PasswordInput } from "@/components/ui/password-input";

export function LoginPage() {
    const { loginIsPending } = useAuth();

    return (
        <Flex
            background="bg-color"
            height="100vh"
            flexDirection="column"
        >
            <GlobalNavBar />

            <Flex minHeight="100vh" alignItems="center">

                {loginIsPending && <LoginPanelLoading />}

                {!loginIsPending && <LoginPanel />}

            </Flex>

            <Footer />
        </Flex >
    );
};

function LoginPanel() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginDto>();
    const { login, loginIsError } = useAuth();
    const onSubmit = async (data: LoginDto) => {
        login(data);
    };

    return (
        <VStack gap={4} padding="34px" borderRadius="34px" backgroundColor="white"
            minWidth="320px" maxW="400px" mx="auto"
            //shadow="3px 3px 10px rgba(0,0,0,0.2)"
            shadow="rgba(120, 120, 128, 0.16) 0px 11px 34px 0px"
            height="fit-content"
        >
            <Heading size="2xl" marginBottom="20px">Login</Heading>

            <Field.Root required invalid={!!errors.email}>
                <Field.Label>
                    E-mail
                </Field.Label>
                <Input type="email" {...register("email", {
                    required: "E-mail is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                    },
                })} placeholder="example@email.com" /> {/* ide 12 px padding */}
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.password}>
                <Field.Label>
                    Password
                </Field.Label>
                <PasswordInput {...register("password", {
                    required: "Password is required",
                })} />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            {loginIsError &&
                <Flex width="100%" justifyContent="center" border="1px solid" borderColor="border.error" backgroundColor="bg.error"
                    color="fg.error" rounded="5px" padding="5px"
                >
                    <Text fontSize="14px">
                        Wrong username or password.
                    </Text>
                </Flex>
            }

            <Button width="full" onClick={handleSubmit(onSubmit)}>
                Login
            </Button>

            <Flex flexDirection="column" alignItems="center" width="100%" marginTop="10px">
                <Text fontSize="14px">
                    Doesn't have an account yet?
                </Text>
                <Link to={Navigation.registration}>
                    <Text fontSize="14px" _hover={{ textDecoration: "underline" }}>
                        Create one
                    </Text>
                </Link>
            </Flex>
        </VStack>
    );
}

function LoginPanelLoading() {
    return (
        <VStack gap={4} padding="34px" borderRadius="34px" backgroundColor="white"
            minWidth="320px" maxW="400px" mx="auto"
            //shadow="3px 3px 10px rgba(0,0,0,0.2)"
            shadow="rgba(120, 120, 128, 0.16) 0px 11px 34px 0px"
            height="fit-content"
        >
            <Heading size="2xl" marginBottom="20px">Login</Heading>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path fill="none" d="M0 0h200v200H0z"></path>
                <path fill="none" stroke-linecap="round" stroke="#000000" stroke-width="15" transform-origin="center" d="M70 95.5V112m0-84v16.5m0 0a25.5 25.5 0 1 0 0 51 25.5 25.5 0 0 0 0-51Zm36.4 4.5L92 57.3M33.6 91 48 82.7m0-25.5L33.6 49m58.5 33.8 14.3 8.2">
                    <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="0;-120" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite">
                    </animateTransform></path><path fill="none" stroke-linecap="round" stroke="#000000" stroke-width="15" transform-origin="center" d="M130 155.5V172m0-84v16.5m0 0a25.5 25.5 0 1 0 0 51 25.5 25.5 0 0 0 0-51Zm36.4 4.5-14.3 8.3M93.6 151l14.3-8.3m0-25.4L93.6 109m58.5 33.8 14.3 8.2">
                    <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="0;120" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite">
                    </animateTransform>
                </path>
            </svg>
        </VStack>
    );
}