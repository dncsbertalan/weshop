import { Box, defineStyle, Field } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const floatingStyles = defineStyle({
  position: "absolute",
  backgroundColor: "bg",
  paddingX: 0.5,
  top: -2.5,
  insetStart: 3,
  fontWeight: "medium",
  pointerEvents: "none",
  color: "fg.muted",
  fontSize: "small",
});

interface FloatingFieldLabelProps extends PropsWithChildren {
  label: React.ReactNode;
}

export function FloatingFieldLabel({ label, children }: FloatingFieldLabelProps) {
  return (
    <Box pos="relative" w="full">
      {children}
      <Field.Label css={floatingStyles} color="border.error">
        {label}
      </Field.Label>
    </Box>
  );
}
