import { CategoryBadge } from "@/components/product/CategoryBadge";
import { toaster } from "@/components/ui/toaster";
import { useCart } from "@/context/cartContext";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { Product } from "@/models/Product";
import {
  Dialog,
  Button,
  Portal,
  CloseButton,
  Flex,
  Image,
  VStack,
  Box,
  Icon,
  Spacer,
  HStack,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";

interface ProductInfoDialogProps {
  product: Product;
}

export function ProductInfoDialog({ product }: ProductInfoDialogProps) {
  const { addItemToCart: addItem } = useCart();
  const { user } = useAuthentication();
  const add = async () => {
    // TODO: Handle require login to add to cart
    addItem(user?.activeCartId ?? 0, product.id);
    toaster.create({
      description: `${product.name} was successfully added to your cart.`,
      type: "info",
    });
  };

  return (
    <Dialog.Root size="full" motionPreset="none" /*motionPreset="slide-in-bottom"*/>
      <Dialog.Trigger asChild>
        <IconButton variant="outline" size="sm" rounded="full">
          <BiDotsHorizontalRounded />
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content backgroundColor="whiteAlpha.800" backdropFilter="saturate(180%) blur(20px)">
            <Flex justifyContent="center" alignItems="center" padding="10px" height="100vh" gap="70px">
              <motion.div
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 2 }}
              >
                <Image
                  src="https://thewholeserving.com/wp-content/uploads/2014/06/Citrus-Cactus-Juice5.jpg"
                  height={500}
                  alt={product.pictureAlternative}
                  borderRadius={18}
                  shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 2 }}
              >
                <VStack
                  alignItems="flex-start"
                  backgroundColor="white"
                  padding="20px"
                  borderRadius={18}
                  shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
                  width={500}
                  height={700}
                >
                  <Heading>{product.name}</Heading>
                  {product.categories && (
                    <Box marginTop="10px">
                      {product.categories.map((product) => (
                        <CategoryBadge key={product.id} categoryName={product.name} />
                      ))}
                    </Box>
                  )}
                  <Text marginTop="10px">{product.description}</Text>
                  <Spacer />
                  <HStack width="100%">
                    <Spacer />
                    <Dialog.ActionTrigger asChild>
                      <Button rounded="full" variant="outline">
                        Cancel
                      </Button>
                    </Dialog.ActionTrigger>
                    <Button rounded="full" onClick={add}>
                      <Icon>
                        <MdAddShoppingCart />
                      </Icon>
                      Add to cart
                    </Button>
                  </HStack>
                </VStack>
              </motion.div>
            </Flex>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
