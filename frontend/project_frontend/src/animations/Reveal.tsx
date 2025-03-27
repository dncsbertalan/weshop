import { Flex } from "@chakra-ui/react";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

export const Reveal = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

    return (
        <Flex ref={ref} justifyContent="center" alignItems="center">
            <motion.div
                variants={{
                    hidden: { opacity: 0, translateY: 75 },
                    visible: { opacity: 1, translateY: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </Flex>
    );
}