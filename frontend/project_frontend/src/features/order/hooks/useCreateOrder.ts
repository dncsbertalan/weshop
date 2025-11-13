import { useMutation } from "@tanstack/react-query";

import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";

import { createOrder } from "../api/createOrder";

export function useCreateOrder() {
  return useMutation({
    mutationFn: ({
      activeCartId,
      createOrderRequest,
    }: {
      activeCartId: number;
      createOrderRequest: CreateOrderRequestDto;
    }) => createOrder(activeCartId, createOrderRequest),
  });
}
