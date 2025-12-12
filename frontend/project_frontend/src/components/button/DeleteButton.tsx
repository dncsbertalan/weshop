import { ButtonProps } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";

import { DeleteButtonBase } from "./DeleteButtonBase";

interface DeleteButtonProps extends ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <DeleteButtonBase onClick={onClick}>
      <LuTrash2 />
    </DeleteButtonBase>
  );
}
