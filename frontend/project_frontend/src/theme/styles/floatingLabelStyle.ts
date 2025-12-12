import { defineStyle } from "@chakra-ui/react";

export const floatingLabelStyles = defineStyle({
  position: "absolute",
  paddingX: "0.5",
  pointerEvents: "none",
  transition: "all",
  top: "-3",
  insetStart: "3.5",
  color: "fg",
  fontSize: "small",
  backgroundColor: "bg",
  zIndex: 1,
});
