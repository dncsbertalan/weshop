import z from "zod";

export const OrderItemDto = z
  .object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  })
  .strict();

export type OrderItemDto = z.infer<typeof OrderItemDto>;
