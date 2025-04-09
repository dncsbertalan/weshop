import { useCart } from '@/context/cartContext';
import { CartItem } from '@/models/CartItem';
import { Box, Flex, HStack, IconButton, Image, NumberInput, Text } from '@chakra-ui/react'
import { FaXmark } from 'react-icons/fa6';
import { LuMinus, LuPlus } from 'react-icons/lu';

type CartItemCardProps = {
    cartItem: CartItem
}

export function CartItemCard({ cartItem }: CartItemCardProps) {
    const { removeItemToCart: removeItem, modifyItemToCart: modifyItem } = useCart();
    const remove = async () => {
        removeItem(cartItem.id);
    }

    return (
        <Box
            width="780px"
            height="135px"
            borderBottom="solid 1px rgb(220, 220, 220)"
            paddingY="32px"
            paddingX="5px"
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

                    <Text fontSize="14px" fontWeight="400px" width="275px">{cartItem.name}</Text>

                    <Box width="120px">
                        <NumberInput.Root value={cartItem.quantity.toString()} unstyled spinOnPress={false}>
                            <HStack gap="2">

                                <NumberInput.DecrementTrigger
                                    asChild
                                    disabled={cartItem.quantity < 2}
                                    onClick={() => modifyItem(cartItem.id, cartItem.quantity - 1)}
                                >
                                    <IconButton variant="outline" size="sm">
                                        <LuMinus />
                                    </IconButton>
                                </NumberInput.DecrementTrigger>

                                <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />

                                <NumberInput.IncrementTrigger
                                    asChild
                                    onClick={() => modifyItem(cartItem.id, cartItem.quantity + 1)}
                                >
                                    <IconButton variant="outline" size="sm">
                                        <LuPlus />
                                    </IconButton>
                                </NumberInput.IncrementTrigger>

                            </HStack>
                        </NumberInput.Root>
                    </Box>

                    <Box width="120px" textAlign="right">
                        <Text fontSize="16px" fontWeight="700px">
                            {cartItem.price} Ft
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