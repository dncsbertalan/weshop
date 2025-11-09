import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useModifyProductInCart } from "@/features/cart/hooks/useModifyProductInCart";
import { useRemoveProductFromCart } from "@/features/cart/hooks/useRemoveProductFromCart";
import { useGetProductImage } from "@/features/products/hooks/useGetProductImage";
import { CartItem } from "@/models/cart";
import { formatCurrency } from "@/utils/currency";
import { Box, Flex, HStack, IconButton, Image, NumberInput, Text } from "@chakra-ui/react";
import { FaXmark } from "react-icons/fa6";
import { LuMinus, LuPlus } from "react-icons/lu";

type CartItemCardProps = {
  cartItem: CartItem;
};

export function CartItemCard({ cartItem }: CartItemCardProps) {
  const { mutate: removeProductFromCart } = useRemoveProductFromCart();
  const { mutate: modifyProductInCart } = useModifyProductInCart();
  const { user } = useAuthentication();
  const remove = async () => {
    removeProductFromCart({ cartId: user?.activeCartId!, cartItemId: cartItem.id });
  };
  const { data: image } = useGetProductImage({ productId: cartItem.productId });

  return (
    <Box
      width={{ sm: "520px", md: "700px", lg: "620px", xl: "780px" }}
      height="fit-content"
      marginX="auto"
      borderBottom="solid 1px rgb(220, 220, 220)"
      padding={{ base: "20px 5px", md: "32px 5px" }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Image
          objectFit="cover"
          maxHeight={{ base: "60px", md: "70px" }}
          src={
            image ??
            "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="
          }
        />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          width={{ sm: "450px", md: "610px", lg: "530px", xl: "690px" }}
          flexWrap={{ base: "wrap", sm: "nowrap" }}
        >
          <Flex flexDirection="column" width={{ base: "150px", md: "235px", lg: "195px", xl: "275px" }}>
            <Text lineHeight="16px" fontSize="14px" fontWeight="400px">
              {cartItem.name}
            </Text>
            <Text marginTop="6px" color="rgb(170, 170, 170)" lineHeight="16px" fontSize="12px" fontWeight="400px">
              {cartItem.productId}
            </Text>
            <Text
              marginTop="6px" //color="rgb(170, 170, 170)"
              lineHeight="16px"
              fontSize="12px"
              fontWeight="400px"
            >
              Added by {cartItem.addedByFirstName} {cartItem.addedByLastName}
            </Text>
          </Flex>

          <Box width={{ base: "100px", md: "120px" }}>
            <NumberInput.Root value={cartItem.quantity.toString()} unstyled spinOnPress={false}>
              <HStack gap="2">
                <NumberInput.DecrementTrigger
                  asChild
                  disabled={cartItem.quantity < 2}
                  onClick={() =>
                    modifyProductInCart({
                      cartId: user?.activeCartId!,
                      cartItemId: cartItem.id,
                      quantity: cartItem.quantity - 1,
                    })
                  }
                >
                  <IconButton variant="outline" size="sm">
                    <LuMinus />
                  </IconButton>
                </NumberInput.DecrementTrigger>

                <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />

                <NumberInput.IncrementTrigger
                  asChild
                  onClick={() =>
                    modifyProductInCart({
                      cartId: user?.activeCartId!,
                      cartItemId: cartItem.id,
                      quantity: cartItem.quantity + 1,
                    })
                  }
                >
                  <IconButton variant="outline" size="sm">
                    <LuPlus />
                  </IconButton>
                </NumberInput.IncrementTrigger>
              </HStack>
            </NumberInput.Root>
          </Box>

          <Box width={{ base: "100px", md: "120px" }} textAlign="right">
            <Text lineHeight={{ base: "21px", md: "24px" }} fontSize={{ base: "14px", md: "16px" }} fontWeight="bold">
              {formatCurrency(cartItem.price)} Ft
            </Text>
          </Box>

          <Box width="40px" textAlign="right">
            <IconButton
              onClick={remove}
              rounded="full"
              color="red"
              variant="outline"
              borderColor="red"
              size="2xs"
              transition="background-color 0.3s, color 0.3s"
              _hover={{
                color: "white",
                backgroundColor: "red",
              }}
            >
              <FaXmark />
            </IconButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
