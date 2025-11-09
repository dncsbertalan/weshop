import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/createOrder";
import { CreateOrderRequestDto } from "@/dtos/request/order/CreateOrderRequestDto";

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
