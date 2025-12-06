import z from "zod";

import { CategoryDto } from "../category/CategoryDto";

export const PagedProduct = z
  .object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    availableQuantity: z.number(),
    categories: CategoryDto.array(),
    isDeleted: z.boolean(),
  })
  .strict();

export type PagedProduct = z.infer<typeof PagedProduct>;
