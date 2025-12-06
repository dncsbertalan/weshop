import { Box, defineStyle, Field, useControllableState, useFieldContext } from "@chakra-ui/react";
import { useState } from "react";

import { PasswordInput, PasswordInputProps } from "../ui/password-input";

const floatingStyles = defineStyle({
  position: "absolute",
  paddingX: "0.5",
  top: "2.5",
  insetStart: "3",
  fontSize: "md",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "all",
  color: "fg.muted",
  "&[data-float]": {
    top: "-3",
    insetStart: "2.5",
    color: "fg",
    fontSize: "small",
    backgroundColor: "bg",
  },
  "&[data-invalid]": {
    color: "border.error",
  },
});

interface FieldPasswordInputFloatingLabelPasswordInputProps extends PasswordInputProps {
  label: React.ReactNode;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
}

export function FieldPasswordInputFloatingLabelPasswordInput({
  label,
  onValueChange,
  value,
  defaultValue = "",
  onFocus,
  onBlur,
  onChange,
  ...rest
}: FieldPasswordInputFloatingLabelPasswordInputProps) {
  const field = useFieldContext();
  const [inputState, setInputState] = useControllableState({
    defaultValue,
    onChange: onValueChange,
    value,
  });

  const [focused, setFocused] = useState(false);
  const shouldFloat = inputState.length > 0 || focused;

  return (
    <Box pos="relative" w="full">
      <PasswordInput
        {...rest}
        onFocus={(e) => {
          onFocus?.(e);
          setFocused(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setFocused(false);
        }}
        onChange={(e) => {
          onChange?.(e);
          setInputState(e.target.value);
        }}
        value={inputState}
        data-float={shouldFloat || undefined}
      />
      <Field.Label css={floatingStyles} data-float={shouldFloat || undefined} data-invalid={field.invalid || undefined}>
        {label}
      </Field.Label>
    </Box>
  );
}
