import { defineSlotRecipe } from "@chakra-ui/react";
import { selectAnatomy } from "@chakra-ui/react/anatomy";

export const selectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  base: {
    clearTrigger: {
      borderRadius: "full",
      padding: 0.5,
      _hover: {
        backgroundColor: "bg.subtle",
      },
    },
    content: {
      backdropFilter: "blur(20px) saturate(180%)",
      bg: "whiteAlpha.800",
      borderRadius: "2xl",
    },
    item: {
      borderRadius: "xl",
    },
  },
});
