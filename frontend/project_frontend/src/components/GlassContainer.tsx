import { Stack, StackProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function GlassContainer({ children }: PropsWithChildren & StackProps) {
  return (
    <Stack
      backgroundImage="linear-gradient(rgba(255, 255, 255, 0.4) 10%, rgba(255, 255, 255, 0.8))"
      backdropFilter="blur(4px)"
      rounded="3xl"
      padding={3}
      shadow="rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 12px 12px 2px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
      position="relative"
      width="max-content"
      _before={{
        content: `''`,
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        bottom: 0,
        rounded: "3xl",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.64) 40%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0) 95%, rgba(255, 255, 255, 0.64))",
        pointerEvents: "none",
        background: "linear-gradient(#ffffffa3 40%, #fff0 75% 95%, #ffffffa3)",
        padding: "1px",
        inset: 0,
        maskImage: "linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)",
        maskPosition: "0 0, 0 0",
        maskSize: "auto auto",
        maskRepeat: "repeat, repeat",
        maskClip: "content-box, border-box",
        maskOrigin: "content-box, border-box",
        maskComposite: "exclude",
        maskMode: "match-source, match-source",
      }}
    >
      {children}
    </Stack>
  );
}
