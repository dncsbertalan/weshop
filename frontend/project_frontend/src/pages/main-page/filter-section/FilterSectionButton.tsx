import { Box, Flex, VStack, Text, Portal, useDisclosure, IconButton } from "@chakra-ui/react";
import { CategorySelection } from "./CategorySelection";
import { PriceSelection } from "./PriceSelection";
import { BsSliders } from "react-icons/bs";

export function FiltersSectionButton() {
    const { open, setOpen } = useDisclosure();
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box hideBelow="max-screen-width">
            <Flex
                background="whiteAlpha.500"
                padding={3}
                borderRadius={10}
                width="250px"
                height="min"
                shadow="2px 2px 10px 3px rgba(0, 0, 0, 0.2);"
                backdropFilter="blur(10px)"
                alignItems="center"
            >
                {open ?
                    (
                        <Portal>
                            {/*<Backdrop />*/}
                            <VStack width="100%" alignItems="flex-start" gap="16px">
                                <Box zIndex="max">
                                    hali
                                    <Text fontWeight="bold">Price range</Text>
                                    <PriceSelection />
                                    <Text fontWeight="bold">Category</Text>
                                    <CategorySelection />
                                </Box>
                            </VStack>
                        </Portal>
                    ) : (
                        <IconButton onClick={handleOpen}>
                            <BsSliders />
                        </IconButton>
                    )}
            </Flex>
        </Box>
    );
}

function Backdrop() {
    return (
        <Box
            width="100vw" height="100vh" position="fixed" top={0} left={0}
            backgroundColor="backdrop-color" backdropFilter="blur(5px)" zIndex="overlay"
        />
    );
}