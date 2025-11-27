import { Input, InputProps } from "@chakra-ui/react";

import { FloatingFieldLabel } from "./FloatingFieldLabel";

interface FloatingLabelInputProps extends InputProps {
  label: React.ReactNode;
}

export function FloatingLabelInput({ label, ...rest }: FloatingLabelInputProps) {
  return (
    <FloatingFieldLabel label={label}>
      <Input {...rest} size="lg" />
    </FloatingFieldLabel>
  );
}
