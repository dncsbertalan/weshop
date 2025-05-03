import { useCart } from '@/context/CartContext';
import { useUser } from '@/hooks/use-user';
import { CartItem } from '@/models/CartItem';
import { formatCurrency } from '@/utils/currency';
import { Box, Flex, HStack, IconButton, Image, NumberInput, Text } from '@chakra-ui/react'
import { FaXmark } from 'react-icons/fa6';
import { LuMinus, LuPlus } from 'react-icons/lu';

type CartItemCardProps = {
    cartItem: CartItem
}

export function CartItemCard({ cartItem }: CartItemCardProps) {
    const { removeItemToCart: removeItem, modifyItemToCart: modifyItem } = useCart();
    const user = useUser();
    const remove = async () => {
        removeItem(user.data!.cartId, cartItem.id);
    }

    return (
        <Box
            width="780px"
            height="135px"
            borderBottom="solid 1px rgb(220, 220, 220)"
            paddingY="32px"
            paddingX="5px"
        //backgroundColor="whiteAlpha.800"
        //backdropFilter="blur(20px) saturate(180%)"
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
            >
                <Image
                    objectFit="cover"
                    maxHeight="70px"
                    src='https://thewholeserving.com/wp-content/uploads/2014/06/Citrus-Cactus-Juice5.jpg'
                />

                <Flex alignItems="center" justifyContent="space-between" width="690px">

                    <Flex flexDirection="column">
                        <Text lineHeight="16px" fontSize="14px" fontWeight="400px" width="275px">{cartItem.name}</Text>
                        <Text marginTop="6px" color="rgb(170, 170, 170)"
                            lineHeight="16px" fontSize="12px" fontWeight="400px" width="275px"
                        >
                            {cartItem.productId}
                        </Text>
                    </Flex>

                    <Box width="120px">
                        <NumberInput.Root value={cartItem.quantity.toString()} unstyled spinOnPress={false}>
                            <HStack gap="2">

                                <NumberInput.DecrementTrigger
                                    asChild
                                    disabled={cartItem.quantity < 2}
                                    onClick={() => modifyItem(user.data!.cartId, cartItem.id, cartItem.quantity - 1)}
                                >
                                    <IconButton variant="outline" size="sm">
                                        <LuMinus />
                                    </IconButton>
                                </NumberInput.DecrementTrigger>

                                <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />

                                <NumberInput.IncrementTrigger
                                    asChild
                                    onClick={() => modifyItem(user.data!.cartId, cartItem.id, cartItem.quantity + 1)}
                                >
                                    <IconButton variant="outline" size="sm">
                                        <LuPlus />
                                    </IconButton>
                                </NumberInput.IncrementTrigger>

                            </HStack>
                        </NumberInput.Root>
                    </Box>

                    <Box width="120px" textAlign="right">
                        <Text lineHeight="24px" fontSize="16px" fontWeight="bold">
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
                        >
                            <FaXmark />
                        </IconButton>
                    </Box>

                </Flex>

            </Flex>
        </Box>
    );
}