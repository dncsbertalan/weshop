import { IconButton } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";

interface DeleteButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <IconButton
      onClick={onClick}
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
    >
      <LuTrash2 />
    </IconButton>
  );
}
