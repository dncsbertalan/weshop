import { Stack } from "@chakra-ui/react";
import { useState } from "react";

import { NavigationBarButtons } from "./NavigationBar.Buttons";
import { NavigationBarCollapsible } from "./NavigationBar.Collapsible";
import { NavigationBarTitle } from "./NavigationBar.Title";
import { NavigationBarWrapper } from "./NavigationBar.Wrapper";

export function NavigationBar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <NavigationBarWrapper>
      <Stack direction="column" flex={1} gap={0}>
        <Stack direction="row" flex={1} alignItems="center" justifyContent="space-between">
          <NavigationBarTitle />
          <NavigationBarButtons open={open} setOpen={setOpen} />
        </Stack>

        <NavigationBarCollapsible open={open} setOpen={setOpen} />
      </Stack>
    </NavigationBarWrapper>
  );
}
