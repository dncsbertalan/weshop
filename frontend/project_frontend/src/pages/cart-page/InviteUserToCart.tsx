import { Box, Button, defineStyle, Field, Flex, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoInformationCircleOutline } from "react-icons/io5";

import { Tooltip } from "@/components/ui/tooltip";
import { useCart } from "@/context/cartContext";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { AddUserToCartRequestDto } from "@/dtos/request/cart/AddUserToCartRequestDto";

export function InviteUserToCart() {
  const { register, handleSubmit } = useForm<AddUserToCartRequestDto>();
  const { addUserToCart } = useCart();
  const { user } = useAuthentication();
  const onSubmit = async (data: AddUserToCartRequestDto) => {
    if (!user) {
      return;
    }

    addUserToCart(user.activeCartId, data);
  };

  return (
    <Flex
      borderRadius="10px"
      padding="20px"
      backgroundColor="whiteAlpha.800"
      //shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
      shadow="0px 10px 20px rgba(0, 0, 0, 0.09), 0px 0px 1px rgba(0, 0, 0, 0.2)"
      backdropFilter="saturate(180%) blur(20px)"
      width={{ base: "100%", sm: "520px", md: "700px", lg: "285px", xl: "300px" }}
      height="min"
    >
      <VStack alignItems="flex-start" width="100%">
        <Flex alignItems="flex-end" gap="5px">
          <Text lineHeight="22px" fontSize="18px" fontWeight="500">
            Invite user
          </Text>
          <Tooltip content="You can invite other users to share your cart with them.">
            <Icon size="md">
              <IoInformationCircleOutline />
            </Icon>
          </Tooltip>
        </Flex>

        <Field.Root marginTop="10px">
          <Box pos="relative" w="full">
            <Input className="peer" placeholder="" {...register("email")} />
            <Field.Label css={floatingStyles}>Email</Field.Label>
          </Box>
        </Field.Root>

        <Flex width="100%" justifyContent="flex-end">
          <Button rounded="full" marginTop="18px" onClick={handleSubmit(onSubmit)}>
            Invite
          </Button>
        </Flex>
      </VStack>
    </Flex>
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
