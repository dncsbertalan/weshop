import { useCart } from '@/context/cartContext'
import { Product } from '@/models/Product'
import { Button, Card, Icon, Image, Spacer, Text } from '@chakra-ui/react'
import { MdAddShoppingCart } from 'react-icons/md'

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
            //backgroundColor="whiteAlpha.500"
            backgroundColor="white"
            //backdropFilter="auto" 
            //backdropBlur="10px"
            backdropFilter="blur(20px)"
            //borderRadius="50px"
            borderRadius={18}
            border="none"
            boxShadow="5px 5px 10px 3px rgba(0, 0, 0, 0.3)"
        >
            <Image
                //src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                //src= {product.picture}
                src='https://thewholeserving.com/wp-content/uploads/2014/06/Citrus-Cactus-Juice5.jpg'
                height={250}
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
                <Spacer />
                <Button
                    rounded="full"
                    onClick={add}
                >
                    <Icon>
                        <MdAddShoppingCart />
                    </Icon>
                    Add to cart
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}