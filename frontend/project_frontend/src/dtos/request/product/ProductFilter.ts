import z from "zod";

export const ProductFilter = z
  .object({
    page: z.number(),
    pageSize: z.number(),
    categoryIds: z.string().nullable(),
    minPrice: z.number().nullable(),
    maxPrice: z.number().nullable(),
    productName: z.string().nullable(),
  })
  .strict();

export type ProductFilter = z.infer<typeof ProductFilter>;
