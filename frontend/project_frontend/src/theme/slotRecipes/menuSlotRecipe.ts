import { defineSlotRecipe } from "@chakra-ui/react";
import { menuAnatomy } from "@chakra-ui/react/anatomy";

export const menuSlotRecipe = defineSlotRecipe({
  slots: menuAnatomy.keys(),
  base: {
    content: {
      backdropFilter: "blur(20px) saturate(180%)",
      bg: "whiteAlpha.800",
      borderRadius: "2xl",
    },
    item: {
      borderRadius: "xl",
    },
    itemGroupLabel: {
      borderRadius: "xl",
      backgroundColor: "bg.subtle",
    },
  },
});
