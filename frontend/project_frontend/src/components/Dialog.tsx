import { DialogRootProps } from "@chakra-ui/react";
import React from "react";

import { DialogContent } from "./Dialog.Content";
import { DialogWrapper } from "./Dialog.Wrapper";

interface DialogProps extends Omit<DialogRootProps, "children"> {
  trigger?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  title?: React.ReactNode;
  noCloseTrigger?: boolean;
}

export function Dialog({ trigger, body, footer, title, noCloseTrigger, ...rest }: DialogProps) {
  return (
    <DialogWrapper trigger={trigger} {...rest}>
      <DialogContent body={body} footer={footer} title={title} noCloseTrigger={noCloseTrigger} />
    </DialogWrapper>
  );
}
