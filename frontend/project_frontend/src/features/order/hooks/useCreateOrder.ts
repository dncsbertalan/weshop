import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { centralToaster } from "@/components/toaster/centralToasterDef";
import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";
import { CartKeys } from "@/features/cart/CartKeys";
import { UserKeys } from "@/features/users/UserKeys";
import { Navigation } from "@/routes/navigation";

import { createOrder } from "../api/createOrder";
import { OrderKeys } from "../OrderKeys";

export function useCreateOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      activeCartId,
      createOrderRequest,
    }: {
      activeCartId: number;
      createOrderRequest: CreateOrderRequestDto;
    }) => createOrder(activeCartId, createOrderRequest),
    onSuccess: async () => {
      centralToaster.create({
        type: "success",
        closable: true,
        description: "Successfully created order. Thanks for your purchase!.",
      });

      await queryClient.invalidateQueries({ queryKey: [UserKeys.CurrentUser] });
      await queryClient.invalidateQueries({ queryKey: [CartKeys.Cart] });
      await queryClient.invalidateQueries({ queryKey: [OrderKeys.Orders] });
      await navigate(Navigation.home, { replace: true });
    },
    onError: () => {
      centralToaster.create({ type: "error", closable: true, description: "Something went wrong." });
    },
  });
}
