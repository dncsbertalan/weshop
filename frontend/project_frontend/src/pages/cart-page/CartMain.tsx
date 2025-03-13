import { Center, Flex, For, VStack, Box } from "@chakra-ui/react";
import { Footer } from "../Footer";
import { NavigationBar } from "../NavigationBar"
import axios from "axios";
import { CartItemDto } from "@/dtos/CartItemDto";
import { useQuery } from "@tanstack/react-query";
import { CartItemHCard } from "@/reusable_components/product/CartItemHCard";

const apiUrl = "/api/carts";
async function fetchCartItems() {
    const token = JSON.parse(localStorage.getItem("token") ?? "ERROR");
    const response = await axios.get(apiUrl, {
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    console.log(response.data);
    return (response.data as CartItemDto[]);
}

export function CartMain() {

    //const total = cart.items.reduce((sum, item) => sum + item.price, 0);

    const {
        //isPending,
        //isError,
        data: cart
    } = useQuery({
        queryKey: ["cartItems"],
        queryFn: fetchCartItems
    });

    return (
        <div>
            <NavigationBar />

            <Center background="purple">
                <Flex background="red.500" borderRadius={10} padding={5}>
                    <VStack>
                        <Box background="gray" padding={3}>
                            {/*total*/}összeg
                        </Box>
                        <For each={cart}>
                            {(item) => (
                                <CartItemHCard cartItem={item} />
                            )}
                        </For>
                    </VStack>
                </Flex>
            </Center>

            <Footer />
        </div>
    );
}