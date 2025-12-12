import { createToaster } from "@chakra-ui/react";

export const messageToaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
  max: 6,
});
