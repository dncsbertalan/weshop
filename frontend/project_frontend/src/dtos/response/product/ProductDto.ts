import z from "zod";

import { CategoryDto } from "../category/CategoryDto";

export const ProductDto = z
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

export type ProductDto = z.infer<typeof ProductDto>;
