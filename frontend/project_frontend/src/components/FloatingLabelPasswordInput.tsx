import { FloatingFieldLabel } from "./FloatingFieldLabel";
import { PasswordInput, PasswordInputProps } from "./ui/password-input";

interface FloatingLabelPasswordInputProps extends PasswordInputProps {
  label: React.ReactNode;
}

export function FloatingLabelPasswordInput({ label, ...rest }: FloatingLabelPasswordInputProps) {
  return (
    <FloatingFieldLabel label={label}>
      <PasswordInput {...rest} size="lg" />
    </FloatingFieldLabel>
  );
}
