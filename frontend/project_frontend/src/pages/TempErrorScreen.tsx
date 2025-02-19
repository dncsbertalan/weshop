import { Box } from "@chakra-ui/react"
import { Link } from "react-router";

export function TempErrorScreen() {
    return (
        <Box backdropBlur="1px" background="red.500">
            <div>
                TEMPORARY ERROR SCREEN, TO DO!!!
            </div>
            <Link to="/">
                BACK TO MAIN PAGE
            </Link>
        </Box>
    );
}