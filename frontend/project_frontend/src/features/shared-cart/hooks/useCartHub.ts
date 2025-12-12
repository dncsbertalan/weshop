import * as signalR from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { CartChangedResponseDto } from "@/dtos/response/cart/CartChangedResponseDto";
import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { CartKeys } from "@/features/cart/CartKeys";

import { sharedCartNotificationService } from "../utils/sharedCartNotificationService";

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

    connection.on("CartUpdated", (response: CartChangedResponseDto) => {
      if (user.userId === response.changedByUser.id) {
        return;
      }

      void queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
      sharedCartNotificationService.cartUpdated(response);
    });

    let isMounted = true;

    connection
      .start()
      .then(async () => {
        if (!isMounted) {
          return;
        }

        await connection.invoke("JoinGroup", user.activeCartId);
      })
      .catch((err: unknown) => console.error("SignalR start error:", err));

    return () => {
      isMounted = false;
      void connection.stop();
    };
  }, [user, queryClient, isAuthenticated, jwtToken]);
}
