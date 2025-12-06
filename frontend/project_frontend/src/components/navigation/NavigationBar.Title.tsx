import { Heading, Span } from "@chakra-ui/react";
import { Link } from "react-router";

import { Navigation } from "@/routes/navigation";

export function NavigationBarTitle() {
  return (
    <Link to={Navigation.home}>
      <Heading
        size="3xl"
        fontWeight="700"
        //backgroundImage="linear-gradient(to right, teal, purple)"
        //backgroundImage="linear-gradient(90deg, #a78bfa, #5eead4)"
        backgroundImage="linear-gradient(90deg, #94a3b8, #6ee7b7)"
        color="transparent"
        backgroundClip="text"
        textShadow="0 1px 2px rgba(0,0,0,0.08)"
      >
        <Span>We</Span>
        Shop
      </Heading>
    </Link>
  );
}
