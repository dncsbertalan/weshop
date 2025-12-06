import { Button, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { LuExternalLink } from "react-icons/lu";

import { FieldInput } from "@/components/input/FieldInput";
import { LinkToOtherPage } from "@/components/LinkToOtherPage";
import { PageContainer } from "@/components/PageContainer";
import { RegistrationRequestDto } from "@/dtos/request/authentication/RegistrationRequestDto";
import { useRegisterUser } from "@/features/authentication/hooks/useRegisterUser";
import { Navigation } from "@/routes/navigation";
import { getFieldKeys } from "@/utils/getFieldKeys";

const registrationRequestKeys = getFieldKeys(RegistrationRequestDto);

export function RegistrationPage() {
  const { mutate } = useRegisterUser();
  const {
    register,
    control,
    formState: { errors },
  } = useForm<RegistrationRequestDto>({
    resolver: zodResolver(RegistrationRequestDto),
  });

  const onSubmit = (registrationRequest: RegistrationRequestDto) => {
    mutate(registrationRequest);
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
            maxWidth={570}
            marginX="auto"
            marginTop={{ md: 16 }}
            gap={14}
          >
            <Heading size="4xl" marginBottom={4}>
              Sign up
            </Heading>

            <Stack width="full" gap={5}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                alignItems={{ base: "column", sm: "star" }}
                gap={{ base: 5, md: 4 }}
              >
                <FieldInput
                  required
                  label="First name"
                  error={errors.firstName}
                  {...register(registrationRequestKeys.firstName)}
                />

                <FieldInput
                  required
                  label="Last name"
                  error={errors.lastName}
                  {...register(registrationRequestKeys.lastName)}
                />
              </Stack>

              <FieldInput
                required
                label="E-mail"
                error={errors.email}
                type="email"
                {...register(registrationRequestKeys.email)}
              />

              <FieldInput
                required
                label="Password"
                error={errors.password}
                {...register(registrationRequestKeys.password)}
              />
            </Stack>

            <Stack gap={4} width="full">
              <Button type="submit" rounded="xl" width="full">
                Sign up
              </Button>

              <Stack alignItems="center" width="100%" gap={0}>
                <Text fontSize="14px">Already have an account?</Text>
                <LinkToOtherPage
                  label="Log in"
                  navigateTo={Navigation.login}
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
