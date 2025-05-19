import { Button, Field, Flex, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { RegistrationDto } from "@/dtos/RegistrationDto";
import { useForm } from "react-hook-form";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { Footer } from "../page-components/footer/Footer";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/context/AuthContext";

export function RegistrationPage() {
    const { register: reg } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<RegistrationDto>();

    return (
        <Flex
            backgroundColor="bg-color"
            height="100vh"
            flexDirection="column"
        >
            <GlobalNavBar />

            <Flex minHeight="100vh" alignItems="center">
                <VStack padding="34px" borderRadius="34px" backgroundColor="white"
                    shadow="rgba(120, 120, 128, 0.16) 0px 11px 34px 0px"
                    maxWidth="420px" mx="auto" mt={10}
                >
                    <Heading size="2xl" marginBottom="20px">Registration</Heading>

                    <HStack height="fit-content" alignItems="flex-start">
                        <Field.Root required invalid={!!errors.firstName}>
                            <Field.Label>
                                First name
                            </Field.Label>
                            <Input {...register("firstName", {
                                required: "First name is required",
                            })} placeholder="First name" />
                            <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root required invalid={!!errors.lastName}>
                            <Field.Label>
                                Last name
                            </Field.Label>
                            <Input {...register("lastName", {
                                required: "Last name is required",
                            })} placeholder="Last name" />
                            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
                        </Field.Root>

                    </HStack>

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
                        })} placeholder="example@email.com" />
                        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required invalid={!!errors.dob}>
                        <Field.Label>
                            Date of birth
                        </Field.Label>
                        <Input type="date" {...register("dob", {
                            required: "Date of birth is required",
                        })} />
                        <Field.ErrorText>{errors.dob?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required invalid={!!errors.password}>
                        <Field.Label>
                            Password
                        </Field.Label>
                        <PasswordInput {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            },
                            validate: {
                                hasNumber: (v) => /\d/.test(v) || "Must contain a number",
                                hasUppercase: (v) => /[A-Z]/.test(v) || "Must contain an uppercase letter"
                            },
                        })} />
                        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                    </Field.Root>

                    <Button width="full" onClick={handleSubmit(reg)}>
                        Register
                    </Button>
                </VStack>
            </Flex>

            <Footer />
        </Flex >
    );
}