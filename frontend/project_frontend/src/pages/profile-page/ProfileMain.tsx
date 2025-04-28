import { Flex, Center, Spacer, Button, VStack, Text } from "@chakra-ui/react";
import { Footer } from "../page-components/footer/Footer";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router";
import { Navigation } from "@/routes/navigation";
import { OrdersSection } from "./OrdersSection";
import { useUser } from "@/hooks/use-user";

export function ProfileMain() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const user = useUser();

    return (
        <Flex
            direction="column"
            minHeight="100vh"
        >
            <GlobalNavBar />
            <NavBarFiller />

            <Center background="#EAEAEA">
                <VStack>

                    <Flex
                        padding={5}
                        gap={10}
                        flexDirection="column"
                    >
                        <Text>Hello, {user.data?.firstName} {user.data?.lastName}!</Text>
                        <Button rounded="full" size="2xl" onClick={() => {
                            logout();
                            navigate(Navigation.home);
                        }}>Logout</Button>
                    </Flex>

                    <OrdersSection />
                </VStack>
            </Center>

            <Spacer />

            <Footer />
        </Flex>
    );
}