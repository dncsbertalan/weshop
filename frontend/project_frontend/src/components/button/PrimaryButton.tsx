import { Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function PrimaryButton({ children, onClick }: PropsWithChildren & { onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Button
            backgroundColor="button-color-primary"
            _hover={{
                backgroundColor: "button-color-primary-hover",
            }}
            padding="11px 21px"
            rounded="full"
            fontSize="17px" lineHeight="20px" fontWeight="400" letterSpacing="-0.374px"
            fontFamily={`"SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}