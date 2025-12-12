import z from "zod";

import { ProductDto } from "./ProductDto";

export const PagedProduct = z
  .object({
    items: ProductDto.array(),
    totalItems: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
  })
  .strict();

export type PagedProduct = z.infer<typeof PagedProduct>;
