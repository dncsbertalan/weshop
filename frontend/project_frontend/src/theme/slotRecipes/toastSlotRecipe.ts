import { defineSlotRecipe } from "@chakra-ui/react";
import { toastAnatomy } from "@chakra-ui/react/anatomy";

export const toastSlotRecipe = defineSlotRecipe({
  slots: toastAnatomy.keys(),
  className: "chakra-toast",
  base: {
    root: {
      borderRadius: "2xl",
      paddingY: 5,
      paddingEnd: 4,
      bg: "bg.panel",
      color: "fg",
      boxShadow: "xl",
      "--toast-trigger-bg": "colors.bg.muted",

      "&[data-type=warning]": {
        bg: "bg.warning",
        color: "fg.warning",
        "--toast-border-color": "colors.border.warning",
      },
      "&[data-type=success]": {
        bg: "bg.success",
        color: "fg.success",
        "--toast-border-color": "colors.border.success",
      },
      "&[data-type=error]": {
        bg: "bg.error",
        color: "fg.error",
        "--toast-border-color": "colors.border.error",
      },
      borderColor: "var(--toast-border-color, inherit)",
      borderWidth: 1,
    },
    title: {
      fontWeight: "medium",
      textStyle: "sm",
      marginEnd: "2",
    },
    description: {
      display: "inline",
      textStyle: "sm",
      opacity: "0.8",
    },
    indicator: {
      flexShrink: "0",
      boxSize: "5",
    },
    actionTrigger: {
      textStyle: "sm",
      fontWeight: "medium",
      height: "8",
      px: "3",
      borderRadius: "l2",
      alignSelf: "center",
      borderWidth: "1px",
      borderColor: "var(--toast-border-color, inherit)",
      transition: "background 200ms",
      _hover: {
        bg: "var(--toast-trigger-bg)",
      },
    },
    closeTrigger: {
      position: "unset",
      color: "{currentColor}/70",
      _hover: {
        color: "{currentColor}",
      },
    },
  },
});
