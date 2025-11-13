import { Button, Field, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Footer } from "@/components/footer/Footer";
import { PasswordInput } from "@/components/ui/password-input";
import { LoginRequestDto } from "@/dtos/request/authentication/LoginRequestDto";
import { useLoginUser } from "@/features/authentication/hooks/useLoginUser";
import { Navigation } from "@/routes/navigation";
import { getFieldKeys } from "@/utils/getFieldKeys";

import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";

const loginRequestKeys = getFieldKeys(LoginRequestDto);

export function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestDto>();
  const { mutateAsync, isError } = useLoginUser();
  const onSubmit = async (loginRequest: LoginRequestDto) => {
    mutateAsync(loginRequest).then(() => navigate(Navigation.home));
  };

  return (
    <Flex background="bg-color" height="100vh" flexDirection="column">
      <GlobalNavBar />

      <Flex minHeight="100vh" alignItems="center">
        <VStack
          gap={4}
          padding="34px"
          borderRadius="34px"
          backgroundColor="white"
          minWidth="320px"
          maxW="400px"
          mx="auto"
          shadow="rgba(120, 120, 128, 0.16) 0px 11px 34px 0px"
          height="fit-content"
        >
          <Heading size="2xl" marginBottom="20px">
            Login
          </Heading>

          <Field.Root required invalid={!!errors.email}>
            <Field.Label>E-mail</Field.Label>
            <Input
              type="email"
              {...register(loginRequestKeys.email, {
                required: "E-mail is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="example@email.com"
            />{" "}
            {/* ide 12 px padding */}
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <PasswordInput
              {...register(loginRequestKeys.password, {
                required: "Password is required",
              })}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          {isError && (
            <Flex
              width="100%"
              justifyContent="center"
              border="1px solid"
              borderColor="border.error"
              backgroundColor="bg.error"
              color="fg.error"
              rounded="5px"
              padding="5px"
            >
              <Text fontSize="14px">Wrong username or password.</Text>
            </Flex>
          )}

          <Button width="full" onClick={handleSubmit(onSubmit)}>
            Login
          </Button>

          <Flex flexDirection="column" alignItems="center" width="100%" marginTop="10px">
            <Text fontSize="14px">Doesn't have an account yet?</Text>
            <Link to={Navigation.registration}>
              <Text fontSize="14px" _hover={{ textDecoration: "underline" }}>
                Create one
              </Text>
            </Link>
          </Flex>
        </VStack>
      </Flex>

      <Footer />
    </Flex>
  );
}
