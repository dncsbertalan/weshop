import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

export const useCartHub = (
    cartId: number | undefined,
    token: string | null,
    onProductAdded: () => void,
) => {
    useEffect(() => {
        if (!cartId || !token) return;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5173/hubs/shared-cart`, {
                accessTokenFactory: () => token,
            })
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                connection.invoke("JoinGroup", cartId);
                console.log("Connected to hub.")
            })
            .catch(err => console.error("Connection error", err));

        connection.on("ProductAdded", () => {
            onProductAdded();
        });

        return () => {
            connection.invoke("LeaveGroup", cartId);
            connection.off("ProductAdded");
            connection.stop();
        };
    }, [cartId, token]);
};