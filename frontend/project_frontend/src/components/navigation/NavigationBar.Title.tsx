import { Link } from "react-router";

import { Navigation } from "@/routes/navigation";

import { GradientText } from "../GradientText";

export function NavigationBarTitle() {
  return (
    <Link to={Navigation.home}>
      <GradientText text="WeShop" />
    </Link>
  );
}
