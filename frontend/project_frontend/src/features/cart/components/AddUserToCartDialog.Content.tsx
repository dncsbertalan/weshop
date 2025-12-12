import { Button, Stack, Text, useDialogContext } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";

import { DialogContent } from "@/components/Dialog.Content";
import { FieldInput } from "@/components/input/FieldInput";
import { centralToaster } from "@/components/toaster/centralToasterDef";
import { AddUserToCartRequestDto } from "@/dtos/request/cart/AddUserToCartRequestDto";
import { CartDto } from "@/dtos/response/cart/CartDto";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useAddUserToCart } from "@/features/shared-cart/hooks/useAddUserToCart";
import { getFieldKeys } from "@/utils/getFieldKeys";

const requestKeys = getFieldKeys(AddUserToCartRequestDto);

interface AddUserToCartDialogContentProps {
  cart: CartDto;
}

export function AddUserToCartDialogContent({ cart }: AddUserToCartDialogContentProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<AddUserToCartRequestDto>({ resolver: zodResolver(AddUserToCartRequestDto) });
  const { user } = useAuthentication();
  const { mutate } = useAddUserToCart();
  const { setOpen } = useDialogContext();
  const onSubmit = (data: AddUserToCartRequestDto) => {
    if (!user) {
      return;
    }

    if (cart.sharedWith.map(({ email }) => email).includes(data.email)) {
      centralToaster.create({
        type: "warning",
        closable: true,
        description: "This person is already a member of your cart",
      });
      return;
    }

    mutate({ cartId: user.activeCartId, userData: { email: data.email } });
    setOpen(false);
  };

  return (
    <Form control={control} onSubmit={({ data }) => onSubmit(data)} style={{ width: "100%" }}>
      <DialogContent
        title="Add user to your cart"
        footer={
          <Button type="submit" rounded="full">
            Invite
          </Button>
        }
        body={
          <Stack gap={4}>
            <Text>Share your cart with friends or family</Text>
            <FieldInput required error={errors.email} label="E-mail" type="email" {...register(requestKeys.email)} />
          </Stack>
        }
      />
    </Form>
  );
}
