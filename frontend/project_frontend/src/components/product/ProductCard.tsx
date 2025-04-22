import { useCart } from '@/context/cartContext'
import { Product } from '@/models/Product'
import { ProductInfoDialog } from '@/pages/product-page/ProductInfoDialog';
import { Button, Card, Flex, Icon, Image, Spacer, Text } from '@chakra-ui/react'
import { MdAddShoppingCart } from 'react-icons/md'
import { toaster } from '../ui/toaster';
import { formatCurrency } from '@/utils/currency';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { FaRegCircleXmark } from 'react-icons/fa6';
interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItemToCart: addItem } = useCart();
    const add = async () => {
        addItem(product.id);
        toaster.create({
            description: `${product.name} was successfully added to your cart.`,
            type: "info",
        })
    }

    return (
        <Flex
            overflow="hidden"
            width="320px"
            height="100%"
            flexDirection="column"
            borderRadius="20px"
            backgroundColor="whiteAlpha.800"
            backdropFilter="blur(20px) saturate(1.8)"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
            _hover={{
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                //scale: 1.01
            }}
            transition="scale 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
        >
            <Image
                src='https://www.zoldbolt.hu/img/86246/5999861502127/350x350,r/5999861502127.webp?time=1679576185'
                height={250}
                alt={product.pictureAlternative}
            />

            <Flex flexDirection="column" padding="0px 20px 20px 20px" marginTop="10px" height="100%">
                <Text fontSize="16px" fontWeight="bold" lineHeight="22.4px">
                    {product.name}
                </Text>
                <Text fontSize="16px" fontWeight="400">
                    {formatCurrency(product.price)} Ft
                </Text>

                <Flex alignItems="center">
                    <Icon marginRight="4px" color={getQuantityColor(product.availableQuantity)}>
                        {product.availableQuantity > 0 ? (
                            <IoCheckmarkCircleOutline />
                        ) : (
                            <FaRegCircleXmark />
                        )}
                    </Icon>
                    <Text fontSize="14px" fontWeight="400" letterSpacing="tight" color={getQuantityColor(product.availableQuantity)}>
                        {getQuantityLabel(product.availableQuantity)}
                    </Text>
                </Flex>

                <Spacer />
                <Flex marginTop="10px">
                    <Button
                        rounded="full" backgroundColor="button-color-primary"
                        onClick={add}
                        _hover={{
                            backgroundColor: "button-color-primary-hover",
                        }}
                    >
                        <Icon>
                            <MdAddShoppingCart />
                        </Icon>
                        Add to cart
                    </Button>

                    <Spacer />
                    <ProductInfoDialog product={product} />
                </Flex>
            </Flex>

        </Flex>
    );
}

function getQuantityLabel(quantity: number) {
    switch (true) {
        case quantity <= 0:
            return "Out of stock";
        case quantity === 1:
            return "Only one left";
        case quantity > 1 && quantity <= 5:
            return "Few items left";
        default:
            return "In stock";
    };
}

function getQuantityColor(quantity: number) {
    switch (true) {
        case quantity <= 0:
            return "rgb(244, 67, 54)"; // "rgb(220, 53, 69)";
        case quantity === 1:
            return "rgb(255, 152, 0)"; // "rgb(255, 120, 50)";
        case quantity > 1 && quantity <= 5:
            return "rgb(255, 193, 7)"; // "rgb(255, 222, 89)";
        default:
            return "rgb(151, 202, 79)"; // "rgb(151, 202, 79)";
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductCard_Old({ product }: ProductCardProps) {
    const { addItemToCart: addItem } = useCart();
    const add = async () => {
        addItem(product.id);
        toaster.create({
            description: `${product.name} was successfully added to your cart.`,
            type: "info",
        })
    }

    return (
        <Card.Root
            maxW="sm"
            overflow="hidden"
            backgroundColor="white"
            backdropFilter="blur(20px)"
            borderRadius={18}
            border="none"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
            _hover={{
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)", scale: 1.025
            }}
            transition="scale 0.2s ease-in-out"
        >
            <Image
                //src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                //src= {product.picture}
                src='https://thewholeserving.com/wp-content/uploads/2014/06/Citrus-Cactus-Juice5.jpg'
                height={250}
                alt={product.pictureAlternative}
            />
            <Card.Body gap="2">

                <Card.Title>
                    {product.name}
                </Card.Title>

                {/*product.categories &&
                    <Box>
                        {product.categories.map((category) => (
                            <CategoryBadge key={category.id} categoryName={category.name} />
                        ))}
                    </Box>*/}

                <Card.Description>
                    {product.description}
                </Card.Description>

                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    {product.price} Ft
                </Text>



            </Card.Body>

            <Card.Footer gap="2">
                {/*<Link to={`/product/${product.id}`}>
                    <Button
                        rounded="full"
                    >
                        Details
                    </Button>
                </Link>*/}
                <ProductInfoDialog product={product} />
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