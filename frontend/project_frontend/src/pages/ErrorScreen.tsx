import { Stack, Text } from "@chakra-ui/react";
import { BiError } from "react-icons/bi";
import { LuExternalLink } from "react-icons/lu";
import { Link } from "react-router";

import { EmptyState } from "@/components/ui/EmptyState";

export function ErrorScreen() {
  return (
    <Stack width="full" height="100vh" backgroundColor="bg" flex={1} alignItems="center" justifyContent="center">
      <EmptyState size="lg" icon={<BiError />} title="Something went wrong" description="Contact customer service" />
      <Link to="/">
        <Stack direction="row" alignItems="center">
          <Text>Go back to main page</Text>
          <LuExternalLink />
        </Stack>
      </Link>
    </Stack>
  );
}
