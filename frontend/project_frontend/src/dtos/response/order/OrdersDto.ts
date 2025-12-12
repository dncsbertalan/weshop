import z from "zod";

import { OrderDto } from "./OrderDto";

export const OrdersDto = z
  .object({
    orders: OrderDto.array(),
  })
  .strict();

export type OrdersDto = z.infer<typeof OrdersDto>;
