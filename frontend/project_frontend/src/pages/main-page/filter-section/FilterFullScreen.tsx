import { Dialog, Button, Portal, CloseButton, Flex, VStack, Text, Icon } from "@chakra-ui/react";
import { CategorySelection } from "./CategorySelection";
import { PriceSelection } from "./PriceSelection";
import { FiFilter } from "react-icons/fi";

export function FilterFullScreen() {
    return (
        <Dialog.Root size="full">

            <Dialog.Trigger asChild>
                <Button size="md" rounded="full" marginBottom="15px" hideFrom="max-screen-width">
                    <Icon><FiFilter /></Icon>
                    Filters
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Positioner>
                    <Dialog.Content
                        backgroundColor="backdrop-color"
                    >
                        <Flex
                            justifyContent="center"
                        >
                            <FiltersSec />
                        </Flex>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton rounded="full" size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export function FilterFullScreen2() {
    return (
        <Dialog.Root size="full">

            <Dialog.Trigger asChild>
                <Button size="md" rounded="full" marginBottom="15px" hideFrom="lg">
                    <Icon><FiFilter /></Icon>
                    Filters
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Positioner>
                    <Dialog.Content
                        backgroundColor="backdrop-color"
                    >
                        <Flex
                            justifyContent="center"
                        >
                            <FiltersSec />
                        </Flex>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton rounded="full" size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

function FiltersSec() {
    return (
        <Flex
            background="whiteAlpha.800"
            padding={3}
            borderRadius={{md: "10px"}}
            marginY={{base: "0px", md: "8px"}}
            width={{base: "1000px", md: "500px"}}
            height="min"
            shadow="2px 2px 10px 3px rgba(0, 0, 0, 0.2);"
            backdropFilter="blur(10px) saturate(1.8)"
            alignItems="center"
        >
            <VStack width="100%" alignItems="flex-start" gap="16px">
                <Text fontWeight="bold">Price range</Text>
                <PriceSelection />
                <Text fontWeight="bold">Category</Text>
                <CategorySelection />
            </VStack>
        </Flex>
    );
};