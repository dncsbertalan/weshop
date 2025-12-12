import { Menu, Portal } from "@chakra-ui/react";
import { FaRightToBracket, FaUser } from "react-icons/fa6";
import { Link } from "react-router";

import { useLogoutUser } from "@/features/authentication/hooks/useLogoutUser";
import { Navigation } from "@/routes/navigation";

import { NavigationBarButton } from "./NavigationBar.Button";

interface NavigationBarProfilButtonProps {
  isVertical?: boolean;
}

export function NavigationBarProfilButton({ isVertical }: NavigationBarProfilButtonProps) {
  const { logout } = useLogoutUser();
  return (
    <Menu.Root positioning={{ placement: "bottom" }}>
      <Menu.Trigger asChild>
        <NavigationBarButton label="Profil" icon={<FaUser />} isVertical={isVertical} />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Link to={Navigation.profile}>
              <Menu.Item value="open-file">
                {" "}
                <FaUser />
                Your profile
              </Menu.Item>
            </Link>
            <Menu.Item value="export" onClick={logout}>
              <FaRightToBracket />
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
