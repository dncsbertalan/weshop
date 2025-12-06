import { Button, CloseButton, Dialog, DialogContentProps as ChakraDialogContentProps } from "@chakra-ui/react";
import React from "react";

interface DialogContentProps extends Omit<ChakraDialogContentProps, "title"> {
  body?: React.ReactNode;
  footer?: React.ReactNode;
  title?: React.ReactNode;
  noCloseTrigger?: boolean;
}
export function DialogContent({ body, footer, title, noCloseTrigger, ...rest }: DialogContentProps) {
  return (
    <Dialog.Content rounded="3xl" maxHeight="90%" {...rest}>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body overflow="auto">{body}</Dialog.Body>

      <Dialog.Footer>
        {!noCloseTrigger && (
          <Dialog.ActionTrigger asChild>
            <Button variant="outline" rounded="full">
              Cancel
            </Button>
          </Dialog.ActionTrigger>
        )}

        {footer}
      </Dialog.Footer>

      <Dialog.CloseTrigger asChild>
        <CloseButton size="sm" rounded="full" />
      </Dialog.CloseTrigger>
    </Dialog.Content>
  );
}
