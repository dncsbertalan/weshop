import z from "zod";

import { OrderItemDto } from "./OrderItemDto";

export const OrderDto = z
  .object({
    orderId: z.string(),
    createdAt: z.coerce.date(),
    items: OrderItemDto.array(),
  })
  .strict();

export type OrderDto = z.infer<typeof OrderDto>;
