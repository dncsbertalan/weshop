import { Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";

interface MultilineTextProps {
  text: string;
}

export function MultilineText({ text }: MultilineTextProps) {
  const textLines = useMemo(() => text.split("\n"), [text]);

  return (
    <Stack>
      {textLines.map((line, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={index}>{line}</Text>
      ))}
    </Stack>
  );
}
