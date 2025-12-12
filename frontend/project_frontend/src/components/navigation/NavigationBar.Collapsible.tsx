import { Collapsible, Stack } from "@chakra-ui/react";

import { NavigationBarButtons } from "./NavigationBar.Buttons";

interface NavigationBarCollapsibleProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function NavigationBarCollapsible({ open, setOpen }: NavigationBarCollapsibleProps) {
  return (
    <Collapsible.Root unmountOnExit open={open} onOpenChange={(event) => setOpen(event.open)}>
      <Collapsible.Content>
        <Stack padding={0}>
          <NavigationBarButtons open={open} setOpen={setOpen} isCollapable />
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
