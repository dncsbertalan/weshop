import { ButtonProps, IconButton } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function DeleteButtonBase({ children, ...rest }: PropsWithChildren & ButtonProps) {
  return (
    <IconButton
      rounded="full"
      color="red"
      variant="outline"
      borderColor="red"
      size="2xs"
      transition="background-color 0.3s, color 0.3s"
      _hover={{
        color: "white",
        backgroundColor: "red",
      }}
      {...rest}
    >
      {children}{" "}
    </IconButton>
  );
}
