import { Product } from '@/models/Product'
import { Badge, Box, Button, Card, HStack, Image, Text } from '@chakra-ui/react'

type ProductCardHorizontalProps = {
    product: Product
}

export function ProductCardHorizontal({ product }: ProductCardHorizontalProps) {

    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
            <Image
                objectFit="cover"
                maxW="200px"
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt={product.pictureAlternative}
            />
            <Box>
                <Card.Body>
                    <Card.Title mb="2">
                        {product.name}
                    </Card.Title>
                    <Card.Description>
                        {product.description}
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            {product.price} Ft
                        </Text>
                    </Card.Description>
                    <HStack mt="4">
                        <Badge></Badge>
                        <Badge></Badge>
                    </HStack>
                </Card.Body>
                <Card.Footer>
                    <Button></Button>
                </Card.Footer>
            </Box>
        </Card.Root>
    );
}