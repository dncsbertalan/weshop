import { Flex } from "@chakra-ui/react";
import React from "react";

interface GlassyContainerProps {
    children: React.ReactNode;
    padding?: number;
    borderRadius?: number;
}

const GlassyContainer: React.FC<GlassyContainerProps> = ({ children, padding, borderRadius }) => {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            backgroundColor="whiteAlpha.800"
            padding={`${padding ?? 4}px`}
            borderRadius={(padding ?? 4) + (borderRadius ?? 0)}
            shadow="3px 3px 10px 3px rgba(0, 0, 0, 0.2);"
            backdropFilter="saturate(180%) blur(20px)"
        >
            {children}
        </Flex>
    );
};

export default GlassyContainer;