import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import { useCartHub } from "@/features/shared-cart/hooks/useCartHub";

import { CentralToaster } from "./toaster/CentralToaster";
import { centralToaster } from "./toaster/centralToasterDef";
import { MessageToaster } from "./toaster/MessageToaster";
import { messageToaster } from "./toaster/messageToasterDef";

export function AppShell() {
  useCartHub();
  const location = useLocation();

  useEffect(() => {
    messageToaster.dismiss();
    centralToaster.dismiss();
  }, [location]);

  return (
    <React.Fragment>
      <MessageToaster />
      <CentralToaster />
      <Outlet />
    </React.Fragment>
  );
}
