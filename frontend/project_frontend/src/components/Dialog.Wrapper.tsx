import { Dialog, DialogRootProps, Portal } from "@chakra-ui/react";

interface DialogWrapperProps extends DialogRootProps {
  trigger?: React.ReactNode;
}

export function DialogWrapper({ trigger, children, ...rest }: DialogWrapperProps) {
  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      closeOnInteractOutside={false}
      placement="center"
      motionPreset="slide-in-bottom"
      {...rest}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(1px)" />
        <Dialog.Positioner>{children}</Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
