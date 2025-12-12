import { IconButton } from "@chakra-ui/react";
import { useEffect,useState } from "react";
import { BsArrowUp } from "react-icons/bs";

import { scrollToTopSmooth } from "@/utils/scroll";

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (!isVisible) {return null;}

    return (
        <IconButton
            backgroundColor="white"
            zIndex="scrool-to-top-button-z-index"
            position="fixed" bottom="50px" right={{ base: "20px", sm: "25px", "max-screen-width": "calc(50% - 720px - 20px)" }}
            rounded="full" boxShadow="0px 0px 5px rgba(0, 0, 0, 0.3)"
            _hover={{
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)"
            }}
            onClick={scrollToTopSmooth}
        >
            <BsArrowUp color="black" />
        </IconButton>
    );
}