import { Field, HStack, InputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

import { FieldInputFloatingLabelInput } from "./FieldInput.FloatingLabelInput";

interface FieldInputProps extends Omit<InputProps, "value" | "defaultValue"> {
  label: string;
  required?: boolean;
  error?: FieldError | undefined;
}

export function FieldInput({ error, required, label, ...rest }: FieldInputProps) {
  return (
    <Field.Root required={required} invalid={!!error}>
      <FieldInputFloatingLabelInput label={label} {...rest} rounded="xl" />
      <HStack>
        {error && <Field.ErrorIcon height={4} color="border.error" />}
        <Field.ErrorText>{error?.message}</Field.ErrorText>
      </HStack>
    </Field.Root>
  );
}
