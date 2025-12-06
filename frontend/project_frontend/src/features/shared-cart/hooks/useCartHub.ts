import * as signalR from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { messageToaster } from "@/components/toaster/messageToasterDef";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { CartKeys } from "@/features/cart/CartKeys";

export function useCartHub() {
  const queryClient = useQueryClient();
  const { isAuthenticated, user, jwtToken } = useAuthentication();

  useEffect(() => {
    if (!jwtToken || !isAuthenticated || !user) {
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5173/hubs/shared-cart", {
        accessTokenFactory: () => jwtToken,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on("ProductAdded", () => {
      void queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
      messageToaster.create({ closable: true, description: "fasz", title: "pina" });
      console.log("működik az isten faszaaaa az isten verje meg yeaaa");
    });

    connection.on("ProductModified", () => {
      void queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
    });

    let isMounted = true;

    connection
      .start()
      .then(async () => {
        if (!isMounted) {
          return;
        }

        console.log("SignalR connected.");

        await connection.invoke("JoinGroup", user.activeCartId);
      })
      .catch((err: unknown) => console.error("SignalR start error:", err));

    return () => {
      isMounted = false;
      void connection.stop();
    };
  }, [user, queryClient, isAuthenticated, jwtToken]);
}
