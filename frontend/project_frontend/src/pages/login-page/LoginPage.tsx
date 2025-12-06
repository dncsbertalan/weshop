import { Button, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { LuExternalLink } from "react-icons/lu";

import { FieldInput } from "@/components/input/FieldInput";
import { FieldPasswordInput } from "@/components/input/FieldPasswordInput";
import { LinkToOtherPage } from "@/components/LinkToOtherPage";
import { PageContainer } from "@/components/PageContainer";
import { LoginRequestDto } from "@/dtos/request/authentication/LoginRequestDto";
import { useLoginUser } from "@/features/authentication/hooks/useLoginUser";
import { Navigation } from "@/routes/navigation";
import { getFieldKeys } from "@/utils/getFieldKeys";

const loginRequestKeys = getFieldKeys(LoginRequestDto);

export function LoginPage() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<LoginRequestDto>({
    resolver: zodResolver(LoginRequestDto),
  });
  const { mutate, isPending } = useLoginUser();
  const onSubmit = (loginRequest: LoginRequestDto) => {
    mutate(loginRequest);
  };

  return (
    <PageContainer noFooter>
      <Flex justifyContent="center" alignItems="center">
        <Form onSubmit={({ data }) => onSubmit(data)} control={control} noValidate style={{ width: "100%" }}>
          <VStack
            paddingY={14}
            paddingX={{ base: 10, md: 16 }}
            borderRadius="4xl"
            backgroundColor="bg"
            shadow={{ md: "great" }}
            minWidth={320}
            maxWidth={400}
            marginX="auto"
            marginTop={{ md: 16 }}
            gap={14}
          >
            <Heading size="4xl" marginBottom={4}>
              Login
            </Heading>

            <Stack width="full" gap={5}>
              <FieldInput
                required
                label="E-mail"
                error={errors.email}
                type="email"
                {...register(loginRequestKeys.email)}
              />

              <FieldPasswordInput
                required
                label="Password"
                error={errors.password}
                {...register(loginRequestKeys.password)}
              />
            </Stack>

            <Stack gap={4} width="full">
              <Button type="submit" width="full" rounded="xl" loading={isPending}>
                Log in
              </Button>

              <Stack alignItems="center" width="100%" gap={0}>
                <Text fontSize="14px">Doesn&apos;t have an account yet?</Text>
                <LinkToOtherPage
                  label="Create one"
                  navigateTo={Navigation.registration}
                  icon={<LuExternalLink />}
                  textProps={{ fontSize: "sm" }}
                />
              </Stack>
            </Stack>
          </VStack>
        </Form>
      </Flex>
    </PageContainer>
  );
}
