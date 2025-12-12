import { ButtonProps } from "@chakra-ui/react";
import { FaXmark } from "react-icons/fa6";

import { DeleteButtonBase } from "./DeleteButtonBase";

export function RemoveButton({ onClick }: ButtonProps) {
  return (
    <DeleteButtonBase onClick={onClick}>
      <FaXmark />
    </DeleteButtonBase>
  );
}
