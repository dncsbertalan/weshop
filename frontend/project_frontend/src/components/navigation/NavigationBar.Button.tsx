import { Button, ButtonProps, defineStyle, Stack } from "@chakra-ui/react";
import { Link } from "react-router";

const buttonStyle = defineStyle({
  rounded: 0,
  height: "global-navbar-height",
  color: "gray.700",
  backgroundColor: "transparent",
  paddingX: 3,
  _hover: {
    backgroundColor: "transparent",
    borderBottom: "1px solid rgba(0, 0, 0, .35)",
    color: "black",
  },
});

const verticalStyle = defineStyle({
  rounded: 0,
  color: "gray.700",
  backgroundColor: "transparent",
  paddingX: 3,
  width: "full",
  _hover: {
    backgroundColor: "bg.muted",
    color: "fg",
  },
});

interface NavigationBarButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  label?: string;
  navigate?: string;
  isVertical?: boolean;
}

export function NavigationBarButton({ label, icon, navigate, isVertical, extra, ...rest }: NavigationBarButtonProps) {
  if (navigate) {
    return (
      <Link to={navigate} style={{ width: isVertical ? "100%" : undefined }}>
        <Button size={isVertical ? "2xl" : "md"} css={isVertical ? verticalStyle : buttonStyle} {...rest}>
          <Stack width="fit-content" position="relative">
            {icon}
            {extra}
          </Stack>
          {label}
        </Button>
      </Link>
    );
  }

  return (
    <Button size={isVertical ? "2xl" : "md"} css={isVertical ? verticalStyle : buttonStyle} {...rest}>
      <Stack width="fit-content" position="relative">
        {icon}
        {extra}
      </Stack>
      {label}
    </Button>
  );
}
