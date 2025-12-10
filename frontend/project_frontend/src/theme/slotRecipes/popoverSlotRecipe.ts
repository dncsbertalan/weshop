import { defineSlotRecipe } from "@chakra-ui/react";
import { popoverAnatomy } from "@chakra-ui/react/anatomy";

export const popoverSlotRecipe = defineSlotRecipe({
  className: "chakra-popover",
  slots: popoverAnatomy.keys(),
  base: {
    content: {
      backdropFilter: "blur(20px) saturate(180%)",
      bg: "whiteAlpha.800",
      borderRadius: "2xl",
    },
    title: {
      fontWeight: "semibold",
      lineHeight: "taller",
      borderRadius: "xl",
      backgroundColor: "bg.subtle",
    },
  },
});
