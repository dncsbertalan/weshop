import { useCart } from '@/context/cartContext'
import { Product } from '@/models/Product'
import { Button, Card, Image, Text } from '@chakra-ui/react'

type ProductCardProps = {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const add = () => {
        addItem(product.id);
    }

    return (
        <Card.Root 
            maxW="sm"   
            overflow="hidden"
            background="white"
            backdropFilter="auto" 
            backdropBlur="10px"
            //backdropFilter="blur(0px)"
            //borderRadius="50px"
        >
            <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                //src= {product.picture}
                alt= {product.pictureAlternative}
            />
            <Card.Body gap="2">

                <Card.Title>
                    {product.name}
                </Card.Title>

                <Card.Description>
                    {product.description}
                </Card.Description>

                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    {product.price} Ft
                </Text>

            </Card.Body>

            <Card.Footer gap="2">
                <Button
                    onClick={add}
                >
                    Add to cart
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}