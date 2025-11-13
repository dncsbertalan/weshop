import { Button, CloseButton, Dialog as ChakraDialog,Portal } from "@chakra-ui/react";
import React from "react";

interface DialogProps {
  trigger: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
}

export function Dialog({ trigger, body, footer, title }: DialogProps) {
  return (
    <ChakraDialog.Root
      lazyMount
      unmountOnExit
      closeOnInteractOutside={false}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <ChakraDialog.Trigger asChild>{trigger}</ChakraDialog.Trigger>
      <Portal>
        <ChakraDialog.Backdrop backdropFilter="blur(1px)" />
        <ChakraDialog.Positioner>
          <ChakraDialog.Content rounded="3xl" maxHeight="90%">
            <ChakraDialog.Header>
              <ChakraDialog.Title>{title}</ChakraDialog.Title>
            </ChakraDialog.Header>

            <ChakraDialog.Body overflow="auto">{body}</ChakraDialog.Body>

            <ChakraDialog.Footer>
              <ChakraDialog.ActionTrigger asChild>
                <Button variant="outline" rounded="full">
                  Cancel
                </Button>
              </ChakraDialog.ActionTrigger>
              {footer}
            </ChakraDialog.Footer>

            <ChakraDialog.CloseTrigger asChild>
              <CloseButton size="sm" rounded="full" />
            </ChakraDialog.CloseTrigger>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </ChakraDialog.Root>
  );
}
