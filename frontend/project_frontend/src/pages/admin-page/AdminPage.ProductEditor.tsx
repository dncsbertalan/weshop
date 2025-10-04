import { PasswordInput } from "@/components/ui/password-input";
import { UpsertProductDto } from "@/dtos/product/UpsertProductDto";
import { useGetProduct } from "@/features/products/hooks/useGetProduct";
import { formatCurrencyFt } from "@/utils/currency";
import { getFieldKeys } from "@/utils/getFieldKeys";
import {
  Button,
  DataList,
  Field,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface AdminPageProductEditorProps {
  productId: number | null;
}

const upsertProductKeys = getFieldKeys(UpsertProductDto);

export function AdminPageProductEditor({
  productId,
}: AdminPageProductEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpsertProductDto>();
  const { data: product } = useGetProduct({ productId });

  return (
    <Stack flex={1}>
      <Text textStyle="lg">Product</Text>

      <VStack
        padding="34px"
        borderRadius="34px"
        backgroundColor="white"
        shadow="rgba(120, 120, 128, 0.16) 0px 11px 34px 0px"
        maxWidth="420px"
        mx="auto"
        mt={10}
      >
        <Heading size="2xl" marginBottom="20px">
          Registration
        </Heading>

        <HStack height="fit-content" alignItems="flex-start">
          <Field.Root required invalid={!!errors.firstName}>
            <Field.Label>First name</Field.Label>
            <Input
              {...register("firstName", {
                required: "First name is required",
              })}
              placeholder="First name"
            />
            <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.lastName}>
            <Field.Label>Last name</Field.Label>
            <Input
              {...register("lastName", {
                required: "Last name is required",
              })}
              placeholder="Last name"
            />
            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
          </Field.Root>
        </HStack>

        <Field.Root required invalid={!!errors.email}>
          <Field.Label>E-mail</Field.Label>
          <Input
            type="email"
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="example@email.com"
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.dob}>
          <Field.Label>Date of birth</Field.Label>
          <Input
            type="date"
            {...register("dob", {
              required: "Date of birth is required",
            })}
          />
          <Field.ErrorText>{errors.dob?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <PasswordInput
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: {
                hasNumber: (v) => /\d/.test(v) || "Must contain a number",
                hasUppercase: (v) =>
                  /[A-Z]/.test(v) || "Must contain an uppercase letter",
              },
            })}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button width="full" onClick={handleSubmit(reg)}>
          Register
        </Button>
      </VStack>

      {product && (
        <DataList.Root orientation="horizontal">
          <DataList.Item>
            <DataList.ItemLabel>Product ID</DataList.ItemLabel>
            <DataList.ItemValue>{product.id}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Product name</DataList.ItemLabel>
            <DataList.ItemValue>{product.name}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Categories</DataList.ItemLabel>
            <DataList.ItemValue>
              {product.categories.map(({ name }) => name).join(", ")}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Description</DataList.ItemLabel>
            <DataList.ItemValue>{product.description}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Price</DataList.ItemLabel>
            <DataList.ItemValue>
              {formatCurrencyFt(product.price)}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Stock</DataList.ItemLabel>
            <DataList.ItemValue>{product.availableQuantity}</DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      )}
    </Stack>
  );
}
