import { addUserToCart } from "@/api/cart-api";
import { Dialog } from "@/components/Dialog";
import { AddUserToCartRequestDto } from "@/dtos/request/cart/AddUserToCartRequestDto";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useAddUserToCart } from "@/features/shared-cart/hooks/useAddUserToCart";
import { getFieldKeys } from "@/utils/getFieldKeys";
import { Box, Button, defineStyle, Field, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";

const requestKeys = getFieldKeys(AddUserToCartRequestDto);

export function AddUserToCartDialog() {
  const { register, handleSubmit } = useForm<AddUserToCartRequestDto>();
  const { user } = useAuthentication();
  const { mutate } = useAddUserToCart();
  const onSubmit = async (data: AddUserToCartRequestDto) => {
    if (!user) {
      return;
    }

    mutate({ cartId: user.activeCartId, email: data.email });
  };

  return (
    <Dialog
      trigger={
        <IconButton variant="ghost" rounded="full">
          <LuPlus />
        </IconButton>
      }
      title="Add user to your cart"
      footer={
        <Button rounded="full" onClick={handleSubmit(onSubmit)}>
          Invite
        </Button>
      }
      body={
        <Stack gap={4}>
          <Text>Share your cart with friends or family</Text>
          <Field.Root marginTop="10px">
            <Box pos="relative" w="full">
              <Input className="peer" placeholder="" {...register(requestKeys.email)} />
              <Field.Label css={floatingStyles}>Email</Field.Label>
            </Box>
          </Field.Root>
        </Stack>
      }
    />
  );
}

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});
