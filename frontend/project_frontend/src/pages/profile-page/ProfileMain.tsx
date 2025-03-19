import { Flex, Center, Spacer } from "@chakra-ui/react";
import { Footer } from "../footer/Footer";
import { Filters } from "../main-page/Filters";
import { NavigationBar } from "../navigation-bar/NavigationBar";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { NavBarFiller } from "../navigation-bar/NavBarFiller";

const BASE_URL = "http://localhost:5220";

async function fetchUser() {
    const response = await fetch(`${BASE_URL}/api/products`);
    //return (await response.json());
    return (await response.json()) as User;
}

export function ProfileMain() {
    const {
        //isPending,
        //isError,
        data: user
    } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser
    });

    return (
        <Flex
            direction="column"
            minHeight="100vh"
        >
            <NavigationBar />
            <NavBarFiller />

            <Center background="purple">

                <Flex
                    padding={5}
                    gap={10}
                >
                    <Filters />

                    {/* Information*/}
                    <Flex background="red.500" borderRadius={15} padding={5}>
                        <div>
                            {user?.firstName} {user?.lastName}
                        </div>
                    </Flex>
                </Flex>
            </Center>

            <Spacer />

            <Footer />
        </Flex>
    );
}