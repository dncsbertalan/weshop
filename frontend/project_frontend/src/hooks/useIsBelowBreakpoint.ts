import { useBreakpointValue } from "@chakra-ui/react";

const BREAKPOINT_ORDER = ["base", "sm", "md", "lg", "xl", "2xl"];

interface UseIsBelowBreakpointParams {
  size: string;
}

export function useIsBelowBreakpoint({ size }: UseIsBelowBreakpointParams) {
  const current = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  if (!current) {
    return false;
  }

  const currentIndex = BREAKPOINT_ORDER.indexOf(current);
  const targetIndex = BREAKPOINT_ORDER.indexOf(size);

  return currentIndex < targetIndex;
}
