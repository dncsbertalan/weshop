import { useCart } from '@/context/cartContext';
import { CartItemDto } from '@/dtos/CartItemDto';
import { Badge, Box, Card, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import { FaTrashCan } from 'react-icons/fa6';

type ProductCardHorizontalProps = {
    cartItem: CartItemDto
}

export function CartItemHCard({ cartItem }: ProductCardHorizontalProps) {
    const { removeItem } = useCart();
    const remove = () => {
        removeItem(cartItem.id);
    }

    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" width={500}>
            <Image
                objectFit="cover"
                maxW="200px"
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                //alt={product.pictureAlternative}
            />
            <Box>
                <Card.Body>
                    <Card.Title mb="2">
                        {cartItem.name}
                    </Card.Title>
                    <Card.Description>
                        {cartItem.description}
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            {cartItem.price} Ft
                        </Text>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            {cartItem.quantity}
                        </Text>
                    </Card.Description>
                    <HStack mt="4">
                        <Badge></Badge>
                        <Badge></Badge>
                    </HStack>
                </Card.Body>
                <Card.Footer>
                    <IconButton
                        onClick={remove}
                    >
                        <FaTrashCan />
                    </IconButton>
                </Card.Footer>
            </Box>
        </Card.Root>
    );
}