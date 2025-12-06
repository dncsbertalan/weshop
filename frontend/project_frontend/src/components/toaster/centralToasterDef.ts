import { createToaster } from "@chakra-ui/react";

export const centralToaster = createToaster({
  placement: "top",
  pauseOnPageIdle: true,
  max: 2,
});
