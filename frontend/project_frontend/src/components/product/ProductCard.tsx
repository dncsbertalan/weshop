import { useCart } from "@/context/cartContext";
import { Product } from "@/models/Product";
import { ProductInfoDialog } from "@/pages/product-page/ProductInfoDialog";
import { Button, Flex, Icon, Image, Spacer, Text } from "@chakra-ui/react";
import { MdAddShoppingCart } from "react-icons/md";
import { toaster } from "../ui/toaster";
import { formatCurrency } from "@/utils/currency";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useGetProductImage } from "@/features/products/hooks/useGetProductImage";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItemToCart: addItem } = useCart();
  const { user } = useAuthentication();
  const add = async () => {
    addItem(user?.activeCartId!, product.id);
    toaster.create({
      description: `${product.name} was successfully added to your cart.`,
      type: "info",
    });
  };
  const { data: image } = useGetProductImage({ productId: product.id });

  return (
    <Flex
      overflow="hidden"
      width={{
        base: "100%",
        sm: "255px",
        md: "225px",
        lg: "225px",
        xl: "290px",
      }}
      height="fit-content"
      flexDirection="column"
      borderRadius="20px"
      backgroundColor="bg-color-product-card"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
      _hover={{
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
      }}
      transition="scale 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
    >
      <Image
        src={
          image !== null && image !== undefined
            ? image
            : "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="
        }
        height={{ base: 220, xl: 250 }}
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
            {product.availableQuantity > 0 ? <IoCheckmarkCircleOutline /> : <FaRegCircleXmark />}
          </Icon>
          <Text
            fontSize="12px"
            fontWeight="400"
            letterSpacing="tight"
            color={getQuantityColor(product.availableQuantity)}
          >
            {getQuantityLabel(product.availableQuantity)}
          </Text>
        </Flex>

        <Spacer />
        <Flex marginTop="10px">
          <Button rounded="full" onClick={add}>
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
  }
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
  }
}
