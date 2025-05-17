
import { Box, Flex, HStack, Icon, IconButton, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { CategorySelection } from "./CategorySelection";
import { PriceSelection } from "./PriceSelection";

export function FiltersSection() {

    return (
        <Box position="relative" hideBelow="max-screen-width">
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
                <VStack width="100%" alignItems="flex-start" gap="16px">
                    <Text fontWeight="bold">Price range</Text>
                    <PriceSelection />
                    <Text fontWeight="bold">Category</Text>
                    <CategorySelection />
                </VStack>
            </Flex>
        </Box>
    );
}

export function FiltersSection2() {

    return (
        <Box position="relative" hideBelow="lg">
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
                <VStack width="100%" alignItems="flex-start" gap="16px">
                    <Text fontWeight="bold">Price range</Text>
                    <PriceSelection />
                    <Text fontWeight="bold">Category</Text>
                    <CategorySelection />
                </VStack>
            </Flex>
        </Box>
    );
}

function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <IconButton variant="ghost" size="2xs" rounded="full" onClick={(e) => { onClick(); e.stopPropagation(); }}>
            <FaXmark />
        </IconButton>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FiltersSection_CenteredDesign() {
    const dis = useDisclosure({ defaultOpen: true });
    const isOpen = dis.open;

    return (
        <Box
            //position="relative"
            position={dis.open ? "fixed" : "fixed"}
            zIndex="1"
            top={isOpen ? "auto" : "97px"}
            left={isOpen ? "auto" : "120px"}
        >
            <Flex
                background="whiteAlpha.500"
                padding={3}
                borderRadius="20px"
                minWidth={dis.open ? "250px" : "50px"}
                height={dis.open ? "min" : "50px"}
                shadow="2px 2px 10px 3px rgba(0, 0, 0, 0.2);"
                backdropFilter="blur(10px) saturate(180%)"
                position="sticky"
                top="97px"
                onClick={() => dis.setOpen(true)}
                transition="all 0.3s ease-in-out"
                width="500px"
                rounded="full"
            >
                {dis.open ? (
                    <HStack width="100%" alignItems="center">
                        <CloseButton onClick={() => dis.setOpen(false)} />
                        <PriceSelection />
                        <CategorySelection />
                    </HStack>
                ) : (
                    <Icon size="2xl">
                        <BsFilter />
                    </Icon>
                )}
            </Flex>
        </Box>
    );
}