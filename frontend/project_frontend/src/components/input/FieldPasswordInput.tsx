import { Field, HStack, InputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

import { FieldPasswordInputFloatingLabelPasswordInput } from "./FieldPasswordInput.FloatingLabelPasswordInput";

interface FieldPasswordInputProps extends Omit<InputProps, "value" | "defaultValue"> {
  label: string;
  required?: boolean;
  error?: FieldError | undefined;
}

export function FieldPasswordInput({ error, required, label, ...rest }: FieldPasswordInputProps) {
  return (
    <Field.Root required={required} invalid={!!error}>
      <FieldPasswordInputFloatingLabelPasswordInput label={label} {...rest} rounded="xl" />
      <HStack>
        {error && <Field.ErrorIcon height={4} color="border.error" />}
        <Field.ErrorText>{error?.message}</Field.ErrorText>
      </HStack>
    </Field.Root>
  );
}
