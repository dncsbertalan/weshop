import { Spinner } from "@chakra-ui/react";

export function CartItemSectionLoading() {
    return (
        <Spinner
            size="xl"
            borderWidth="4px"
            css={{ "--spinner-track-color": "colors.gray.200" }}
        />
    );
}