import { Flex, Center, Spacer, Button } from "@chakra-ui/react";
import { Footer } from "../page-components/footer/Footer";
import { NavBarFiller } from "../page-components/navigation-bar/NavBarFiller";
import { GlobalNavBar } from "../page-components/navigation-bar/GlobalNavBar";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router";
import { Navigation } from "@/routes/navigation";

export function ProfileMain() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <Flex
            direction="column"
            minHeight="100vh"
        >
            <GlobalNavBar />
            <NavBarFiller />

            <Center background="#EAEAEA">

                <Flex
                    padding={5}
                    gap={10}
                >
                    <Button rounded="full" size="2xl" onClick={() => {
                        logout();
                        navigate(Navigation.home);
                    }}>Logout</Button>
                </Flex>
            </Center>

            <Spacer />

            <Footer />
        </Flex>
    );
}