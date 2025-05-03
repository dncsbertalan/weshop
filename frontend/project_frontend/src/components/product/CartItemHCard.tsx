import { useCart } from '@/context/CartContext';
import { CartItem } from "@/models/cart";
import { Box, Card, HStack, IconButton, Image, NumberInput, Spacer, Text } from '@chakra-ui/react'
import { FaTrashCan } from 'react-icons/fa6';
import { CategoryBadge } from './CategoryBadge';
//import { BiMinus, BiPlus } from 'react-icons/bi';
import { LuMinus, LuPlus } from 'react-icons/lu';

type ProductCardHorizontalProps = {
    cartItem: CartItem
}

export function CartItemHCard({ cartItem }: ProductCardHorizontalProps) {
    const { removeItemToCart: removeItem, modifyItemToCart: modifyItem } = useCart();
    const remove = async () => {
        removeItem(cartItem.id);
    }

    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="2xl">
            <Image
                objectFit="cover"
                maxW="200px"
                //src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" 
                src='https://thewholeserving.com/wp-content/uploads/2014/06/Citrus-Cactus-Juice5.jpg' 
            />

            <Box>
                <Card.Body>
                    <Card.Title mb="2">{cartItem.name}</Card.Title>

                    <Card.Description>
                        {cartItem.description}
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            {cartItem.price} Ft
                        </Text>
                        {/*<Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            {cartItem.quantity}
                        </Text>*/}
                    </Card.Description>

                    {cartItem.categories &&
                        <Box marginTop="4">
                            {cartItem.categories.map((category) => (
                                <CategoryBadge key={category.id} categoryName={category.name} />
                            ))}
                        </Box>}
                </Card.Body>
                <Card.Footer>
                    <IconButton
                        onClick={remove}
                        rounded="full"
                    >
                        <FaTrashCan />
                    </IconButton>

                    <Spacer />

                    <NumberInput.Root value={cartItem.quantity.toString()} unstyled spinOnPress={false}>
                        <HStack gap="2">

                            {cartItem.quantity > 1 &&
                                <NumberInput.DecrementTrigger
                                    asChild
                                    onClick={() => modifyItem(cartItem.id, cartItem.quantity - 1)}
                                >
                                    <IconButton variant="outline" size="sm">
                                        <LuMinus />
                                    </IconButton>
                                </NumberInput.DecrementTrigger>
                            }

                            {cartItem.quantity <= 1 &&
                                <NumberInput.DecrementTrigger
                                asChild
                                onClick={remove}
                            >
                                <IconButton variant="outline" size="sm">
                                    <FaTrashCan />
                                </IconButton>
                            </NumberInput.DecrementTrigger>
                            }

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
                </Card.Footer>
            </Box>
        </Card.Root>
    );
}